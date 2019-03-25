

class security2goWrapper {

    //must have for now...

    getPublicKey(keySlot) {
        return '044ee01125ffc089a68ab7d7de710794812bf7a64fdfb12f3d3f0bd25449584e620fe44b5851f6fd8ce4235d7b12f6410ded7e607305e4fca6c835afa5bf7abb70';
    }

    generateSignature(keySlot, messageToSign ) {
        return '30440220581ed1f364a175063a54ed46dafe543ee2655fc1105c55269f6cb15efe78992202200e846b532c352769a4ac1194091907bb6ec2e1149d4c2a2bda8469d4514f3b2d';
    }

    //TODO maybe later ?
    // -- all other functions the card offers?!
}

module.exports = {
    security2goWrapper
}

// testcode: runable with "node ."
// var wrapper = new security2goWrapper();
// console.log('publickey: ' + wrapper.getPublicKey(1));
// console.log('signature: ' + wrapper.generateSignature(1, 0x00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF));
