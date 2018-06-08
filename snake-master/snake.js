'use strict'

var LetterItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        
        this.number = obj.number;
        this.score = obj.score ;
        this.author = obj.author;
    }
};

LetterItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheLetter = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new LetterItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    LocalContractStorage.defineProperty(this, "length",null);
};

TheLetter.prototype ={
    init:function(){
        this.length=0;
        return "ok";
    },

    save:function(number,score ){
        if(!number || !score ){
            throw new Error("empty number or score ")
        }

        if(number.length > 30 || score .length > 1000){
            throw new Error("  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        

        var letterItem = new LetterItem();
        letterItem.author = from;
        letterItem.number = number;
        letterItem.score  = score ;
        

        this.data.put(this.length,letterItem);
        this.length=this.length+1;
    },

    get:function(number){
      
        return this.data.get(number-1);
    }
}

module.exports = TheLetter;