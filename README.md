# Getting Started

## For test:

<ul>
    <li>start server from repo healthy_cakes_bot_<b>react</b> (npm start)</li>
    <li>launch ngrok and send <code>ngrok http 3000</code></li>
    <li><ul>copy url from ngrok and past to:</li>
        <li><ul>BotFather in Telegram:</li>
            <li>/setmenubutton  for all bots</li>
            <ul>example for store https://dad5-2a0d-6fc2-4fa1-c400-891d-85db-5017-af5e.eu.ngrok.io/?source=telegram</ul>
            <ul>example for baker https://dad5-2a0d-6fc2-4fa1-c400-891d-85db-5017-af5e.eu.ngrok.io/?source=telegram_baker</ul>
            <ul>example for courier https://dad5-2a0d-6fc2-4fa1-c400-891d-85db-5017-af5e.eu.ngrok.io/?source=telegram_courier</ul>
            <li>@healthy_cakes_bot and other settings</li>
            </ul>
        <li>const <code>webAppUrl</code> in healthy_cakes_bot_<b>node</b>\index.js</li>
        </ul>
    <li>start server from repo healthy_cakes_bot_<b>node</b> (npm start)</li>
    <li>and change in healthy_cakes_bot_<b>node</b> <code>const [{ token }] = JSON.parse(fs.readFileSync("./botData.json", "utf8"))</code> for token value (file botData.json in gitignore)</li>
</ul>

## For production:

<ul>
    <li>connect https://app.netlify.com/ to healthy_cakes_bot_<b>react</b> and deploy it</li>
    <span>Already connected, this is the link: https://healthy-cakes-store.netlify.app. It updated auto after git repository updated</span>
    <li><ul>copy url from netlify.com and past to:</li>
        <li><ul>BotFather in Telegram:</li>
            <li>/setmenubutton</li>
            <li>@healthy_cakes_bot and other settings</li>
            </ul>
        <li>const <code>webAppUrl</code> in healthy_cakes_bot_<b>node</b>\index.js</li>
        </ul>
    <li>start server from repo healthy_cakes_bot_<b>node</b> (npm start) or find another server and change <b>baseUrl</b>. Already connected, this is the link:  https://cakes-node.onrender.com</li>
    <li>and change in healthy_cakes_bot_<b>node</b> <code>const [{ token }] = JSON.parse(fs.readFileSync("./botData.json", "utf8"))</code> for token value (file botData.json in gitignore)</li>
</ul>

### Web Apps for Bots description:

<p>https://core.telegram.org/bots/webapps </p>
