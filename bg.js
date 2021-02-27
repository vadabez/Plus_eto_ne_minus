chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.name === "Plus_eto_ne_minus") {
        if (request.question == 'get_login_link') {
            fetch('https://crm.skyeng.ru/order/generateLoginLink?userId=' + request.id, {headers: {'x-requested-with': 'XMLHttpRequest'}})
                .then(response => response.json())
                .then(json => { sendResponse({answer: json}) });
            return true;
        }
	}
});