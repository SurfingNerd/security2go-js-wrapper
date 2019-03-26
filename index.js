const util = require('util');
const exec = util.promisify(require('child_process').exec);


class security2goWrapper {

    //must have for now...

    async getPublicKey(keySlot) {
        const { stdout, stderr } = await exec('blocksec2go get_key_info ' + keySlot);

        let line = stdout.split('\n')[2];
        let publickey = line.split(':')[1].trim().slice(2);

        return publickey;
    }

    async generateSignature(keySlot, messageToSign ) {
        const { stdout, stderr } = await exec('blocksec2go generate_signature ' + keySlot + ' ' + messageToSign);

        let line =  stdout.split('\n')[2];
        let signature = line.split(':')[1].trim();

        return signature;

    }
    //TODO maybe later ?
    // -- all other functions the card offers?!
}

module.exports = {
    security2goWrapper
}

// testcode: runable with "node ."

async function test()
{
    var wrapper = new security2goWrapper();
    let publickey = await wrapper.getPublicKey(1);
    console.log('publickey: ' + publickey);
    let signature = await wrapper.generateSignature(1, "00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF");
    console.log('signature: ' + signature);
}

//test();
