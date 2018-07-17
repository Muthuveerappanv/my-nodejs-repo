var getUser = (id, callback) =>{
    user = {
        id,
        name: 'Muthu'
    }

    setTimeout(() => {
        callback(user);
    }, 3000);
}

getUser(31, userObject => {
    console.log(userObject);
});