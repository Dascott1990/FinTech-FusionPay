import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/interfaces/crypto';
import { Link } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const fetchCurrencies = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/listings');
    if (!response.ok) throw new Error('Failed to fetch currencies');
    return response.json();
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
};

const Page = () => {
  const headerHeight = useHeaderHeight();

  const { data: currencies, isLoading, error } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchCurrencies,
    refetchInterval: 10000, // Auto-refresh every 10s
    staleTime: 5000, // Reduce stale data
  });

  const ids = currencies?.map((currency: Currency) => currency.id).join(',');

  const { data: cryptoInfo } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`http://localhost:8082/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!currencies,
  });

  if (isLoading) return <ActivityIndicator size="large" color={Colors.primary} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center' }}>❌ Error loading cryptocurrencies.</Text>;

  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={[defaultStyles.sectionHeader, { fontSize: 24, fontWeight: '700' }]}>📈 Market Overview</Text>
      
      <View style={[defaultStyles.block, { gap: 12 }]}>
        {currencies?.map((currency: Currency) => {
          const price = currency.quote.EUR.price.toFixed(2);
          const change = currency.quote.EUR.percent_change_1h;
          const isPositive = change > 0;
          const color = isPositive ? 'green' : 'red';

          return (
            <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity 
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                {/* Crypto Icon */}
                <Image 
                  source={{ uri: cryptoInfo?.[currency.id]?.logo || 'https://via.placeholder.com/40' }} 
                  style={{ width: 44, height: 44, borderRadius: 22 }} 
                />

                {/* Name & Symbol */}
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                  <Text style={{ fontSize: 14, color: Colors.gray }}>{currency.symbol.toUpperCase()}</Text>
                </View>

                {/* Price & Change */}
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>{price} €</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={isPositive ? 'caret-up' : 'caret-down'} size={16} color={color} />
                    <Text style={{ fontSize: 14, color }}>{change.toFixed(2)}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Page;
