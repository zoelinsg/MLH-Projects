function updateClock(){
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const time = hours + ":" + minutes;

  chrome.action.setBadgeText({text: time});
  chrome.action.setBadgeBackgroundColor({color: "#000000"});
}

chrome.runtime.onInstalled.addListener(()=>{
  chrome.alarms.create("clockAlarm",{periodInMinutes:1});
  updateClock();
});

chrome.alarms.onAlarm.addListener(()=>{
  updateClock();
});

updateClock();