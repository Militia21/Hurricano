const mongoose = require("mongoose");
module.exports = {
  name: "guildCreate",
  run: async (guild, client) => {
    try {
      const data = await client.db.guild.getInfo(guild.id);
      if (!data)
        await new client.schemas.guild({
          _id: mongoose.Types.ObjectId(),
          name: guild.name,
          id: guild.id,
        }).save();
    } catch (err) {
      client.logger.warn(err);
    }
  },
};
