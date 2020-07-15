const events = require('events');

const myEvent = new events.EventEmitter();
const myEvent1 = new events.EventEmitter();

//two parts one fore and the another listener,
//emit bhanne methodley kunai euta event fire garcha aba yesko listener hunu paryo
myEvent.emit('Newyork')
myEvent.emit('Newyork')

setTimeout(function() {
    myEvent.emit('Newyork',{name:'Newyork times America'});
    
},3000)


myEvent.on('Newyork',function(data)
{
    console.log('my event fired>>', data);
})