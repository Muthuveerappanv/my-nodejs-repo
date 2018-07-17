var square = x => x*x;

console.log(square(4));

var arrowmethod = {
    name: 'Muthu',
    print: () => {
        console.log('Hi');
    },
    printalt () {
        console.log(`Hi ${this.name}`);
    }
};

arrowmethod.printalt();