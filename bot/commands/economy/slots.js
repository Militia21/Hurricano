const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "slots",
  cooldown: 30,
  slash: false,
  description: "Play the slot machine!",
  async run(message, args) {
    let topEmojis = [":grapes: :grapes: :grapes:", ":apple: :apple: :apple:"];
    let top = topEmojis[Math.floor(Math.random() * topEmojis.length)];
    let midEmojis = [":grapes: :grapes: :apple:", ":apple: :apple: :grapes:"];
    let mid = midEmojis[Math.floor(Math.random() * midEmojis.length)];
    let bottomEmojis = [
      ":tangerine: :apple: :grapes:",
      ":grapes: :apple: :tangerine:",
    ];
    let bottom = bottomEmojis[Math.floor(Math.random() * bottomEmojis.length)];

    let slotsTimeout = 5000;
    let emojis;
    let color;
    let amount = Math.floor(Math.random() * 2000) - 1000;

    if (amount > 500) emojis = top;
    if (amount < 501 && amount > 0) emojis = mid;
    if (amount < 1) emojis = bottom;
    if (amount > 0) color = "GREEN";
    if (amount < 0) color = "RED";

    let embed = new MessageEmbed()
      .setTitle("Slot Machine")
      .setColor(color)
      .addField("You spun:", emojis);

    if (amount < 0) embed.setDescription(`You lost **$${amount}**`);
    if (amount > 0) embed.setDescription(`You won **$${amount}**`);

    const userInfo = client.db.users.cache.get(message.author.id);

    if (amount > 0) userInfo.wallet = userInfo.wallet + amount;
    if (amount < 0) userInfo.wallet = userInfo.wallet - amount;

    const saveData = await userInfo.save();

    client.users.cache.set(message.author.id, saveData);

    message.channel.send(embed);
  },
});
