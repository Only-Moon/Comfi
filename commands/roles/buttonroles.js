const simplydjs = require("simply-djs")

module.exports = {
       name: "buttonrole",
       description: "Reaction Roles With Buttons",
       ownerOnly: false,
       options: [
    {
       name: 'add',
       description: 'Add Reaction Role to Bot msg only',
       type: "SUB_COMMAND",
       options: [
    {
        name: 'channel',
        type: 'CHANNEL',
        description: 'channel of that message',
        required: true,
    },
    {
        name: 'message',
        type: 'STRING',
        description: 'the message id',
        required: true,
     },
    {
        name: 'role',
        type: 'ROLE',
        description: 'Role to Add',
        required: true,
    },
     {
        name: 'label',
        type: 'STRING',
        description: 'name of the button ?',
        required: false,
    },
    {
        name: 'style',
        type: 'STRING',
        description: 'color of the button',
        required: false,
        choices: [
    {
            name: 'PRIMARY',
            value: 'PRIMARY'
   },
    {
            name: 'SECONDARY',
            value: 'SECONDARY'
    },
    {
            name: 'SUCCESS',
            value: 'SUCCESS'
     },
     {
            name: 'DANGER',
            value: 'DANGER'
    },
    ],
    },
    {
        name: 'emoji',
        type: 'STRING',
        description: 'emoji for the button',
        required: false,
    },
      ],
    },
    {
       name: "remove",
       description: "Removes roles from a bot message",
       type: "SUB_COMMAND",
       options: [ 
    {  
       name: 'channel', 
       type: 'CHANNEL', 
       description: 'channel of that message', 
       required: true,
    }, 
    { 
       name: 'message', 
       type: 'STRING', 
       description: 'the message id', 
       required: true,
   }, 
   { 
       name: 'role', 
       type: 'ROLE', 
       description: 'Role to remove', 
       required: true,
   }, 
    ],
    },
    ],
    userperm: [""],
    botperm: [""], 
run: async (bot, interaction, args) => {
let [ options ] = args 

if (options === "add") {

simplydjs.betterBtnRole(bot, interaction, {
    type: "add"
})
  
}

if (options === "remove") { 

simplydjs.betterBtnRole(bot, interaction, {
    type: "remove"
})  

}
  
}
}
