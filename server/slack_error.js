const _ = require('lodash');
const slackNode = require('slack-node');

function getRemoteAddress(req) {
    return req["x-real-ip"] || req.ip || req._remoteAddress || req.connection && req.connection.remoteAddress || undefined;
}

function createCodeBlock(title, code) {
    if (_.isEmpty(code)) return '';
    code = typeof code === 'string' ? code.trim() : JSON.stringify(code, null, 2);
    const tripleBackticks = '```';
    return '_' + title + '_' + tripleBackticks + code + tripleBackticks + '\n';
}

function sendErrorToSlack(webhookUri, token, channel, err, req) {
    const slack = new slackNode(token ? token : '');

    if (!token) {
        slack.setWebhook(webhookUri);
    }

    const request = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body || {}
    };

    const attachment = {
        fallback: err.name + ': ' + err.message,
        color: err.status < 500 ? 'warning' : 'danger',
        author_name: req.headers.host,
        title: err.name + ': ' + err.message,
        fields: [{ title: 'Request URL', value: req.url, short: true }, {
            title: 'Request Method',
            value: req.method,
            short: true
        }, { title: 'Status Code', value: err.status, short: true }, {
            title: 'Remote Address',
            value: getRemoteAddress(req),
            short: true
        }],
        text: [{ title: 'Stack trace:', code: err.stack }, {
            title: 'Request',
            code: request
        }].map(function (data) {
            return createCodeBlock(data.title, data.code);
        }).join(''),
        mrkdwn_in: ['text'],
        footer: 'express-errors-to-slack',
        ts: parseInt(Date.now() / 1000)

    };

    if (!token) {
        slack.webhook({ attachments: [attachment] }, function (error, response) {
            if (error) console.error(error);
        });
    } else {
        slack.api('chat.postMessage', {
            text: attachment.fallback,
            attachments: JSON.stringify([attachment]),
            channel: channel
        }, function (err, response) {
        });
    }
}

module.exports =
    function () {
        const options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if ((typeof options === 'undefined' ? 'undefined' : _.isObject(options)) === false) {
            throw new Error('Expected options to be a object');
        }

        if (typeof options.webhookUri === 'undefined' && typeof options.token === 'undefined') {
            throw new Error('Neither webhookUri or token are defined');
        }

        if (typeof options.webhookUri !== 'undefined' && typeof options.webhookUri !== 'string') {
            throw new Error('Expected webhookUri to be a string ');
        }

        if (typeof options.token !== 'undefined' && typeof options.token !== 'string') {
            throw new Error('Expected webhookUri to be a string');
        }

        const webhookUri = options.webhookUri;
        const skip = options.skip || false;
        const token = options.token || false;
        const channel = options.channel || '';

        return function (err, req, res, next) {
            err.status = err.status || 500;
            if (skip !== false && skip(err, req, res)) return next(err);
            sendErrorToSlack(webhookUri, token, channel, err, req);
            next(err);
        };

    };