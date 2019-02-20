class Profile {
    constructor({
        username: username,
        name: {firstName: firstName, lastName: lastName},
        password: password
    }){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser({
            username: this.username,
            name: {firstName: this.firstName, lastName: this.lastName},
            password: this.password
            },(err,data) => {
                console.log(`Has been created user ${this.username} , password ${this.password}`);
                callback(err,data);
            });
        }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);            
            callback(err, data);
        });
    }

    performLogin(callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err,data) => {
            console.log(`Login: ${this.username} password:${this.password}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({fromCurrency,targetCurrency,targetAmount}, (err,data) => {
            console.log(data,err);
            console.log(`Convert from ${fromCurrency} to ${targetCurrency}. Amount = ${targetAmount}`);            
            callback(err,data);
        });
    }

    transferMoney({to,amount}, callback){
        return ApiConnector.transferMoney({to,amount}, (err,data) => {
            console.log(`Transfer ${amount} to ${to} from ${this.username}`);
            callback(err,data);
        });
    }

    getStocks(callback) {
        return ApiConnector.getStocks((err,data)=>{
            console.log(data);
            console.log('GetStocks method is working');
            callback(err,data);
        });
    }

    currentCurrency(){
        ApiConnector.getStocks

    }

}

function main(){
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass'
    });


    //сначала создаем и авторизуем пользователя
    Ivan.createUser((err,data) =>{
        if (err) {
            console.error('Error during creating user Ivan');
        } else {
            console.log(data);
            console.log(`User Ivan has been created`);
        }
    });

    Ivan.performLogin((err,data)=> {
        if (err) {
            console.error('Error during login user Ivan');
        } else {
            console.log(`User Ivan has been logined`);
        }
    });

    Ivan.getStocks((err,data) => {
        if(err) {
            console.error('Error during get stocks for Ivan');
        } else {
            console.log(`User Ivan has been got stocks`);
        }        
    })


    //после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency:'EUR', amount: 500000 }, (err, data) => {        
        //console.log(data,err);
        if (err) {
            console.error('Error during adding money to Ivan');
        }else{
            console.log('Money has been added to Ivan');
        }
    });

    Ivan.convertMoney({fromCurrency:'EUR',targetCurrency:'NETCOIN',targetAmount:50000}, (err,data) => {
        console.log(err,data);
        if (err) {
            console.error('Error during convert money for Ivan');
        }else{
            console.log('Money has been converted for Ivan');
        }
    })

    Ivan.transferMoney({to:'petya',amount:50000},(err,data) => {
        console.log(err,data);
        if (err) {
            console.error('Error during transfer money to Petya');
        } else {
            console.log(`User Petya transfered money`);
        }
    })


    const Petya = new Profile({
        username: 'petya',
        name: { firstName: 'Petr', lastName: 'Antonochkin' },
        password: 'petyaspass'
        
    })

    Petya.createUser((err,data) =>{
        if (err) {
            console.error('Error during creating user Petya');
        } else {
            console.log(`User Petya has been created`);
        }
    });

    Petya.performLogin((err,data)=> {
        if (err) {
            console.error('Error during login user Petya');
        } else {
            console.log(`User Petya has been logined`);
        }
    });

    Petya.addMoney({ currency:'EUR', amount: 0 }, (err, data) => {
        console.log(data);        
        if (err) {
            console.error('Error during adding money to Petya');
        }else{
            console.log('Money has been added to Petya');
        }
    });

    Petya.convertMoney({fromCurrency:'EUR',targetCurrency:'NETCOIN',targetAmount:500000}, (err,data) => {
        console.log(data);
        if (err) {
            console.error('Error during convert money for Petya');
        }else{
            console.log('Money has been converted for Petya');
        }
    })



    Petya.getStocks((err,data) => {
        if(err) {
            console.error('Error during get stocks for Petya');
        } else {
            console.log(`User Petya has been got stocks`);
        }        
    })
}

main();

