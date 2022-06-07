
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let tempBalance = 0
    for(let i = 0; i < this.transactions.length; i++){
      tempBalance += this.transactions[i].value
    }
  return tempBalance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(this.isAllowed){
      this.time = new Date();
      this.account.addTransaction(this);
      return true
    }
    return false
  }
}

class Deposit extends Transaction {
  get isAllowed() { return true}
  get value() {
    return this.amount
  }
}

class Withdrawal extends Transaction {
  get isAllowed() {
    if((this.account.balance + this.value) >= 0 ){
      return true
    }
    return false
  }
  get value() {
    return -this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// const accountEdu = new Account('Edu');

// const t1 = new Deposit(120.00, accountEdu);
// t1.commit();

// const t2 = new Withdrawal(50.00, accountEdu);
// t2.commit();

// const t3 = new Withdrawal(200.00, accountEdu);
// t3.commit();

// const t4 = new Withdrawal(300.00, accountEdu);
// t4.commit();

// console.log('Ending Balance:', accountEdu.balance);

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
