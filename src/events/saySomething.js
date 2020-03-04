const EventEmmiter = require('events');

function say(who, when, what, emitter, interval) {
  let date = new Date();
  let emit = false;
  if(when.days.includes(date.getUTCDay()) && when.hours === date.getUTCHours()) {
    if(interval.type === 'seconds') {
      if(when.minutes === date.getUTCMinutes() &&
      when.seconds === date.getUTCSeconds()) {
        emit = true;
      }
    } else if(interval.type === 'minutes') {
      if(when.minutes === date.getUTCMinutes()) {
        emit = true;
      }
    } else {
      emit = true;
    }
  }
  if(emit) {
    console.info(`Saying ${what} to ${who.username ? who.username : who} at ${date.toUTCString()}`);
    let tag = who.username ? `<@${who.id}>` : null;
    emitter.emit('say', tag);
  }
}

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
    if(!isNaN(this.when.minutes) && (this.when.minutes < 0 || this.when.minutes > 59)) {
      return console.error(`Can't say goodbye on this unexistent minute: ${this.when.minutes}`);
    }
    if(!isNaN(this.when.seconds) && (this.when.seconds < 0 || this.when.seconds > 59)) {
      return console.error(`Can't say goodbye on this unexistent second: ${this.when.seconds}`);
    }
    const interval = {}
    if(!isNaN(this.when.seconds)) {
      interval['type'] = 'seconds';
      interval['value'] = 1000;
    } else if(!isNaN(this.when.minutes)) {
      interval['type'] = 'minutes';
      interval['value'] = 1000*60;
    } else {
      interval['type'] = 'hours';
      interval['value'] = 1000*60*60;
    }
    console.info(`Event: '${this.what}' started and set to interval: ${interval.type}.`);
    switch(this.what) {
      case 'goodbye':
        return setInterval(say, interval.value, this.who, this.when, this.what, this, interval);
        break;
      case 'wakeup':
        return setInterval(say, interval.value, this.who, this.when, this.what, this, interval);
        break;
      default:
        return console.log(`Dude, I can't say ${this.what}`);
    }
  }
}

module.exports = SaySomething;