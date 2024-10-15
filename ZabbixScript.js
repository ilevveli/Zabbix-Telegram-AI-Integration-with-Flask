var FlaskWebhook = {
    url: null,
    message: null,
    event_id: null,
    trigger_status: null,

    sendMessage: function () {
        var params = {
            message: FlaskWebhook.message,
            event_id: FlaskWebhook.event_id,
            trigger_status: FlaskWebhook.trigger_status
        };
        var data, response, request = new HttpRequest();

        request.addHeader('Content-Type: application/json');
        data = JSON.stringify(params);

        Zabbix.log(4, '[Flask Webhook] URL: ' + FlaskWebhook.url);
        Zabbix.log(4, '[Flask Webhook] params: ' + data);
        response = request.post(FlaskWebhook.url, data);
        Zabbix.log(4, '[Flask Webhook] HTTP code: ' + request.getStatus());

        try {
            response = JSON.parse(response);
        } catch (error) {
            response = null;
        }

        if (request.getStatus() !== 200 || !response || response.status !== 'success') {
            throw 'Failed to send to Flask: ' + (response ? response.message : 'Unknown error');
        }
    }
};

try {
    var params = JSON.parse(value);

    if (typeof params.WebhookUrl === 'undefined') {
        throw 'Parameter "WebhookUrl" is missing';
    }
    if (typeof params.Message === 'undefined') {
        throw 'Parameter "Message" is missing';
    }
    if (typeof params.EventId === 'undefined') {
        throw 'Parameter "EventId" is missing';
    }
    if (typeof params.TriggerStatus === 'undefined') {
        throw 'Parameter "TriggerStatus" is missing';
    }

    FlaskWebhook.url = params.WebhookUrl;
    FlaskWebhook.message = params.Message;
    FlaskWebhook.event_id = params.EventId;
    FlaskWebhook.trigger_status = params.TriggerStatus;

    FlaskWebhook.sendMessage();

    return 'OK';
} catch (error) {
    Zabbix.log(4, '[Flask Webhook] notification failed: ' + error);
    throw 'Sending failed: ' + error + '.';
}
