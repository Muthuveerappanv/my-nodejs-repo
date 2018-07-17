var users = [{
    id: 1,
    name: 'Muthu',
    schoolId: 101
}, {
    id: 2,
    name: 'Veera',
    schoolId: 999
}]

var grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 1,
    schoolId: 101,
    grade: 82
}]

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        var user = users.find(user => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Cannot find user with id ${id}`)
        }
    })
}

const getGrade = (id) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === id));
    })
}

const getUserAlt = async (id) => {
    return await users.find(user => user.id === id);
 
}

const getGradeAlt = async (id) => {
    return await grades.filter(grade => grade.schoolId === id);
}

const getStatusAlt = async (userId) => {
    const user = await getUserAlt(userId);
    const grades = await getGradeAlt(user.schoolId);
    if (grades.length > 0) {
        return grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
}

getStatusAlt(1).then(user => console.log(user)).catch(e => console.log(e))


// const getStatus = (userId) => {
//     var tempUsr;
//     return getUser(userId).then(user => {
//         tempUsr = user;
//         return getGrade(user.schoolId).then(grades => {
//             if (grades.length > 0) {
//                 return grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
//             }
//         })
//     })
// }

// getStatus(2).then(result => console.log(result))