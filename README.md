# Getting Started

<ul><b>For test:</b>
    <li>start server from repo healthy_cakes_bot_<b>react</b> (npm start)</li>
    <li>launch ngrok and send <code>ngrok http 3000</code></li>
    <li><ul>copy url from ngrok and past to:</li>
        <li><ul>BotFather in Telegram:</li>
            <li>/setmenubutton</li>
            <li>@healthy_cakes_bot and other settings</li>
            </ul>
        <li>const <code>webAppUrl</code> in healthy_cakes_bot_<b>node</b>\index.js</li>
        </ul>
    <li>start server from repo healthy_cakes_bot_<b>node</b> (npm start)</li>
</ul>

<ul><b>For production:</b>
    <li>connect https://app.netlify.com/ to healthy_cakes_bot_<b>react</b> and deploy it</li>
    <span>Already connected, this is the link: https://jocular-tartufo-23c9c3.netlify.app. It updated auto after git repository updated</span>
    <li><ul>copy url from netlify.com and past to:</li>
        <li><ul>BotFather in Telegram:</li>
            <li>/setmenubutton</li>
            <li>@healthy_cakes_bot and other settings</li>
            </ul>
        <li>const <code>webAppUrl</code> in healthy_cakes_bot_<b>node</b>\index.js</li>
        </ul>
    <li>start server from repo healthy_cakes_bot_<b>node</b> (npm start) or find another server for node.js :)</li>
</ul>
