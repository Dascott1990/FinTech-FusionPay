import Dropdown from '@/components/Dropdown';
import RoundBtn from '@/components/RoundBtn';
import WidgetList from '@/components/SortableList/WidgetList';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useBalanceStore } from '@/store/balanceStore';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect, useRef } from 'react';

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const headerHeight = useHeaderHeight();

  const fadeAnim = useRef(new Animated.Value(0)).current; // For smooth transitions

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money',
    });
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      {/* Balance Display */}
      <Animated.View style={[styles.account, { opacity: fadeAnim }]}>
        <Text style={styles.currency}>₦</Text>
        <Text style={styles.balance}>{Intl.NumberFormat('en-NG').format(balance())}</Text>
        <TouchableOpacity style={styles.accountBtn}>
          <Text style={styles.accountBtnText}>Accounts</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
        <RoundBtn icon={'refresh'} text={'Exchange'} onPress={clearTransactions} />
        <RoundBtn icon={'list'} text={'Details'} />
        <Dropdown />
      </View>

      {/* Transactions Section */}
      <Text style={defaultStyles.sectionHeader}>Recent Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet</Text>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={transaction.amount > 0 ? 'arrow-up-circle' : 'arrow-down-circle'} 
                  size={28} 
                  color={transaction.amount > 0 ? 'green' : 'red'} 
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                {transaction.amount > 0 ? '+' : '-'}₦{Math.abs(transaction.amount)}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Widgets Section */}
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  account: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  balance: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 4,
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
    opacity: 0.7,
  },
  accountBtn: {
    marginTop: 14,
    backgroundColor: Colors.lightGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  accountBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  emptyText: {
    padding: 14,
    color: Colors.gray,
    textAlign: 'center',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  iconContainer: {
    marginRight: 14,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.gray,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Page;
