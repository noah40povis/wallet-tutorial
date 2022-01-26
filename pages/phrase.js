"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var PhraseBox_1 = require("../components/PhraseBox");
var context_1 = require("../context");
var icons_1 = require("@ant-design/icons");
var router_1 = require("next/router");
var Bip39 = require("bip39");
// Import Bip39 to generate a phrase and convert it to a seed:
// Import the Keypair class from Solana's web3.js library:
var Phrase = function () {
    var _a = (0, react_1.useState)(false), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)(false), visible = _b[0], setVisible = _b[1];
    var _c = (0, context_1.useGlobalState)(), setAccount = _c.setAccount, mnemonic = _c.mnemonic, setMnemonic = _c.setMnemonic;
    var router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(function () {
        // *Step 2*: implement a function that generates a mnemonic when the page renders, and uses it to create a wallet (i.e. account)
        // (a) review the import guidance on lines 9 and 11
        // (b) generate a mnemonic phrase by importing Bip39 and then implementing the appropriate method on the imported Bip39 instance
        // Documentation Reference: https://github.com/bitcoinjs/bip39
        var generatedMnemonic = Bip39.generateMnemonic();
        // This line saves the mnemonic phrase to context state so we can display it for the wallet user to copy
        setMnemonic(generatedMnemonic);
        // (c) convert the mnemonic to seed bytes and make sure it's 32-bytes (Hint: console log the seed to see how many bytes you have vs how many you need)
        // Documentation Reference: https://github.com/bitcoinjs/bip39
        var seed = Bip39.mnemonicToSeedSync(generatedMnemonic);
        console.log(seed);
        // (d) use the seed to generate a new account (i.e. a new keypair)
        // Documentation Reference:
        //   https://solana-labs.github.io/solana-web3.js/classes/Keypair.html
        //   https://solana-labs.github.io/solana-web3.js/classes/Keypair.html#fromSeed
        var newAccount = null;
        // This line sets the account to context state so it can be used by the app
        setAccount(newAccount);
    }, []);
    var showPopconfirm = function () {
        setVisible(true);
    };
    var handleOk = function () {
        setLoading(true);
        router.push("/wallet");
    };
    var handleCancel = function () {
        setVisible(false);
    };
    var warning = "Keep this phrase secret and safe. This is the only way for you to access your digital assets. Moreover, anyone can access your assets with it! Think of it as the password to your online bank account.";
    return (<>
      <h1 className={"title"}>Secret Recovery Phrase</h1>

      <p>
        This recovery phrase is generated with your private keys and can be used
        to recover your account.
      </p>

      <antd_1.Alert message={warning} type="warning"/>

      <p>
        Once you have stored this phrase somewhere safe, click finish to go to
        your wallet.
      </p>

      <PhraseBox_1["default"] mnemonic={mnemonic}></PhraseBox_1["default"]>

      {!loading && (<antd_1.Popconfirm title="Did you copy the phrase?" visible={visible} onConfirm={handleOk} okButtonProps={{ loading: loading }} onCancel={handleCancel} cancelText={"No"} okText={"Yes"}>
          <antd_1.Button type="primary" onClick={showPopconfirm}>
            Finish
          </antd_1.Button>
        </antd_1.Popconfirm>)}

      {loading && <icons_1.LoadingOutlined style={{ fontSize: 24 }} spin/>}
    </>);
};
exports["default"] = Phrase;
