const EventEmmiter = require('events');

class SaySomething extends EventEmmiter{
  constructor(client, who, when, what) {
    super();
    this.client = client;
    this.who = who;
    this.when = when;
    this.what = what
  }
  start() {
    if(!this.client || !this.who || !this.when || !this.what) {
      return console.error(`Can't start because missing arguments`)
    }
    if(!this.when.days || !Array.isArray(this.when.days) || !this.when.days.length) {
      return console.error(`Can't figure out which days I have to say goodbye`);
    }
    if(isNaN(this.when.hours) || this.when.hours < 0 || this.when.hours > 23) {
      return console.error(`Can't say goodbye on this unexistent hour: ${this.when.hours}`);
    }
    if(isNaN(this.when.minutes) || this.when.minutes < 0 || this.when.minutes > 59) {
      return console.error(`Can't say goodbye on this unexistent minute: ${this.when.minutes}`);
    }
    if(isNaN(this.when.seconds) || this.when.seconds < 0 || this.when.seconds > 59) {
      return console.error(`Can't say goodbye on this unexistent second: ${this.when.seconds}`);
    }
    switch(this.what) {
      case 'goodbye':
        return setInterval(function(who, when, emitter) {
          let date = new Date();
          if(when.days.includes(date.getUTCDay())) {
            if(
              when.hours === date.getUTCHours() && 
              when.minutes === date.getUTCMinutes() && 
              when.seconds === date.getUTCSeconds()) {
                console.info(`Saying goodbye to ${who.username} at ${date.toUTCString()}`);
                let tag = `<@${who.id}>`
                emitter.emit('say', tag);
              }
          }
        }, 1000, this.who, this.when, this);
        break;
      case 'wakeup':
        return setInterval(function(when, emitter) {
          let date = new Date();
          if(when.days.includes(date.getUTCDay())) {
            if(
              when.hours === date.getUTCHours() && 
              when.minutes === date.getUTCMinutes() && 
              when.seconds === date.getUTCSeconds()) {
                console.info(`Saying wake up to ${who} bitches at ${date.toUTCString()}`);
                emitter.emit('say');
              }
          }
        }, 1000, this.when, this);
        break;
      default:
        return console.log(`Dude, I can't say ${this.what}`);
    }
  }
}

module.exports = SaySomething;