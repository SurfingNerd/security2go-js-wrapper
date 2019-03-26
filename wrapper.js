const util = require('util');
const exec = util.promisify(require('child_process').exec);


class security2goWrapper {

    //must have for now...

    async getPublicKey(keySlot) {
        const { stdout, stderr } = await exec('/usr/bin/python3 /home/sn/github/BlockchainSecurity2Go-Python-Library/blocksec2go get_key_info ' + keySlot);

        let line = stdout.split('\n')[2];
        let publickey = line.split(':')[1].trim().slice(2);

        return publickey;
    }

    async generateSignature(keySlot, messageToSign ) {
        const { stdout, stderr } = await exec('/usr/bin/python3 /home/sn/github/BlockchainSecurity2Go-Python-Library/blocksec2go generate_signature ' + keySlot + ' ' + messageToSign);

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
