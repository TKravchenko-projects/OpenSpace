const controllerPassword = "TrustNo1";

const acceptPasswordButton = document.querySelector(".acceptPasswordButton");
acceptPasswordButton.onclick = function () {
    const password = document.querySelector(".password").value
    if (password === controllerPassword) {
        enableController();
        enablePasswordFields(false);
    }
};

const levers = getControllerElements(".levers");
const checkButtons = getControllerElements(".check-buttons");
const launchSettingElements = levers.concat(checkButtons);
launchSettingElements.forEach(element => {
    element.onchange = function () {
        enableLaunchButton(isLaunchReady());
    };
})

function isLaunchReady() {
    return levers.every(lever => lever.value === 100) && checkButtons.every(checkButton => checkButton.checked);
}

function enableController(value = true) {
    enableAllLevers(value);
    enableAllCheckButtons(value);
}

function enableAllLevers(value = true) {
    enableInputs(".levers", value);
}

function enableAllCheckButtons(value = true) {
    enableInputs(".check-buttons", value);
}

function enableInputs(parentNodeSelector, value) {
    getControllerElements(parentNodeSelector).forEach(controllerElement => controllerElement.disabled = !value);
}

function getControllerElements(parentNodeSelector) {
    return Array.from(document.querySelector(parentNodeSelector).querySelectorAll("input"));
}

function enableLaunchButton(value = true) {
    document.querySelector(".launch").disabled = !value;
}

function enablePasswordFields(value = true) {
    document.querySelector(".password").disabled = !value;
    document.querySelector(".acceptPasswordButton").disabled = !value;
}

const buttonLaunch = document.querySelector(".launch");
buttonLaunch.onclick = function () {
    let rotation = "rotate(25deg)";
    let rocketAnimation = document.querySelector(".rocket").animate([
        {transform: rotation},
        {transform: rotation + " translate(200px, -500px)"},
        {transform: rotation + " translate(600px, -500px)"},
        {transform: rotation + " translate(700px, -1500px)"}
    ], {
        duration: 3000,
        fill: "forwards"
    });

    rocketAnimation.finished.then(function () {
        if (confirm("Do you want repeat?")) {
            window.location.reload();
        }
    });

    enableLaunchButton(false);
    enableController(false);
};
