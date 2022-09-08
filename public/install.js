'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(ev){
   deferredInstallPrompt = ev;
   installButton.removeAttribute('hidden');
}

function installPWA(ev){
    deferredInstallPrompt.prompt();
    ev.srcElement.setAttribute('hidden', true);
    deferredInstallPrompt.userChoice.then((choice) => {
        if(choice.outcome === "accepted"){
            console.log("aceptado");
        } else {
            console.log("No aceptado");
        }
        deferredInstallPrompt = null;
    })
}

window.addEventListener('appinstalled', logAppInstalled);

function logAppInstalled(ev){
    console.log("App Shooter Game instalada");
}