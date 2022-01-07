const mongoose = require("mongoose");

let rs = {
  type: String,
  required: true,
};

const timerSchema = mongoose.Schema({
  userId: rs,
  guildId: rs,
  remind_channel: rs,
  remind_reason: rs,
  remind_duration: {
    type: Number,
    required: true,
  },
  remind_location: rs,
  endsAt: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("timer", timerSchema);