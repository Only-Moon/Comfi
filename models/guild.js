const { model, Schema } = require('mongoose');
const {
  MessageEmbedAuthor,
  MessageEmbedFooter,
  ColorResolvable,
} = require('discord.js');

/*
 * Comfi Bot for Discord
 * Copyright (C) 2021 Xx-Mohit-xX
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const schema = new Schema({
  // General
  guildId: String,
  premium: { type: Boolean, default: false },
  prefix: { type: String, default: 'Cr!' },
  color: { type: String, default: process.env.color || '#F4B3CA' },

  // AutoNick
  auto_nick: { type: String, default: 'NONE' },

  // Suggestions
  suggestions: { type: Boolean, default: false },
  suggestions_channel: { type: String, default: 'NONE' },

  // Chatbot
  chatbot: { type: Boolean, default: false },
  chat_channel: { type: String, default: 'NONE' },

  // Confess
  confession: { type: Boolean, default: false },
  confess_channel: { type: String, default: 'NONE' },

  // NQN
  nqn: { type: Boolean, default: false },

  // Tickets
  ticket: { type: Boolean, default: false },
  ticket_category: { type: String, default: 'NONE' },
  ticket_role: { type: String, default: 'NONE' },

  // Leveling
  leveling: { type: Boolean, default: false },
  leveling_coleave: { type: Boolean, default: false },
  leveling_channel: { type: String, default: 'NONE' },
  leveling_message: {
    type: String,
    default: 'Congrats {{user#mention}} on reaching level {{level}}',
  },
  leveling_image: { type: String, default: 'https://i.imgur.com/InltiPs.png' },
  leveling_embedtgl: { type: Boolean, default: true },
  leveling_embed: { type: Array, default: [] },
  leveling_roles: { type: Array, default: [] },

  // Auto moderation
  automod_links: { type: Boolean, default: false },
  automod_links_links: { type: Array, default: [] },
  automod_links_ignoredchannels: { type: Array, default: [] },
  automod_words: { type: Boolean, default: false },
  automod_words_list: { type: Array, default: [] },
  anti_alt: { type: Boolean, default: false },
  anti_scam: { type: Boolean, default: false },
  anti_scam_time: { type: Number, default: 43200000 },

  verification: { type: Boolean, default: false },
  verification_channel: { type: String, default: 'NONE' },
  verification_role: { type: String, default: 'NONE' },
  verification_message: {
    type: String,
    default: 'Please type the words below to gain access to the server.',
  },

  // Membercount
  member_counter: { type: Boolean, default: false },
  member_counter_channel: { type: String, default: 'NONE' },
  member_counter_channel_type: { type: String, default: 'GUILD_VOICE' },
  member_counter_channel_name: { type: String, default: 'Members: ' },

  // Welcome
  welcome: { type: Boolean, default: false },
  welcome_channel: { type: String, default: 'NONE' },
  welcome_mentionrole: { type: String, default: 'NONE' },
  welcome_joinrole: { type: Array, default: [] },
  welcome_dmuser: { type: Boolean, default: false },
  welcome_message: { type: String, default: 'Welcome {{user#mention}}' },
  welcome_image: { type: String, default: 'https://i.imgur.com/8MggL9S.png' },
  welcome_embedtgl: { type: Boolean, default: false },
  welcome_embed: { type: Array, default: [] },

  // Leave
  leave: { type: Boolean, default: false },
  leave_channel: { type: String, default: 'NONE' },
  leave_mentionrole: { type: String, default: 'NONE' },
  leave_dmuser: { type: Boolean, default: false },
  leave_message: { type: String, default: 'Goodbye {{user#tag}}' },
  leave_image: { type: String, default: 'https://i.imgur.com/wyFi8zu.png' },
  leave_embedtgl: { type: Boolean, default: false },
  leave_embed: { type: Array, default: [] },

  // Boost
  boost: { type: Boolean, default: false },
  boost_channel: { type: String, default: 'NONE' },
  boost_message: {
    type: String,
    default:
      '{{user#mention}} just boosted {server}. Now We Have {{boost#count}} boosts',
  },
  boost_image: { type: String, default: 'https://i.imgur.com/wTKiUY8.png' },
  boost_embedtgl: { type: Boolean, default: false },
  boost_embed: { type: Array, default: [] },

  // Logs
  logging: { type: Boolean, default: false },
  logging_channel: { type: String, default: 'NONE' },
  modlog: { type: Boolean, default: false },
  mod_channel: { type: String, default: 'NONE' },

  // Mute
  mute: { type: Boolean, default: false },
  mute_role: { type: String, default: 'NONE' },
  muted_role: { type: Array, default: [] },

  // Dropdown roles
  dropdownRoles: { type: Array, default: [] },

  // embed builder
  embeds: {
    type: Array,
    default: [
      {
        name: undefined,
        author: { name: undefined, iconURL: undefined },
        color: undefined,
        description: undefined,
        footer: { text: undefined, iconURL: undefined },
        image: undefined,
        timestamp: undefined,
        thumbnail: undefined,
        title: undefined,
      },
    ],
  },
  embeds_count: { type: Number, default: 0 },
});

module.exports = model('Guilds', schema);
