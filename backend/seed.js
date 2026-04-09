require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Post = require('./models/Post');
const Article = require('./models/Article');
const News = require('./models/News');
const Product = require('./models/Product');
const Challenge = require('./models/Challenge');
const CoinHistory = require('./models/CoinHistory');
const Chat = require('./models/Chat');
const Community = require('./models/Community');
const Tip = require('./models/Tip');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for seeding...');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Post.deleteMany({}),
    Article.deleteMany({}),
    News.deleteMany({}),
    Product.deleteMany({}),
    Challenge.deleteMany({}),
    CoinHistory.deleteMany({}),
    Chat.deleteMany({}),
    Community.deleteMany({}),
    Tip.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // --- USERS ---
  const users = await User.insertMany([
    {
      name: 'Christopher',
      email: 'christopher@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Nature Activist',
      interests: ['Plantation', 'Recycling', 'Solar Energy'],
      coins: 1040,
      carbonSaved: 2,
      plasticSaved: 5,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Harish',
      email: 'harish@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Eco Enthusiast & Blogger',
      interests: ['DIY', 'Gardening', 'Sustainability'],
      coins: 780,
      carbonSaved: 3.5,
      plasticSaved: 8,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'John Britto',
      email: 'john@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      bio: 'Green Living Advocate',
      coins: 560,
      carbonSaved: 1.5,
      plasticSaved: 3,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Yogesh',
      email: 'yogesh@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      bio: 'Sustainability has become such a passion',
      coins: 320,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Akshaya',
      email: 'akshaya@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      bio: 'Plant Mom 🌿',
      coins: 450,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Nithish',
      email: 'nithish@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      bio: 'Zero Waste Journey',
      coins: 290,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Sri Nisha',
      email: 'srinisha@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      bio: 'Inspiring eco stories',
      coins: 610,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Kishore',
      email: 'kishore@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      bio: 'Climate Action Now',
      coins: 180,
      isVerified: true,
      onboardingDone: true,
    },
    {
      name: 'Kailash',
      email: 'kailash@ecospace.com',
      password: await bcrypt.hash('password123', 12),
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      bio: 'Eco Warrior',
      coins: 420,
      isVerified: true,
      onboardingDone: true,
    },
  ]);
  console.log(`Created ${users.length} users`);

  // Set followers/following
  users[0].followers = [users[1]._id, users[2]._id, users[3]._id, users[4]._id];
  users[0].following = [users[1]._id, users[5]._id, users[6]._id];
  await users[0].save();

  // --- POSTS ---
  const posts = await Post.insertMany([
    {
      author: users[1]._id,
      images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'],
      caption: 'Planting trees and greenery is a simple yet impactful way to improve the environment and create a healthier future for everyone.',
      likes: [users[0]._id, users[2]._id, users[3]._id],
      hashtags: ['#ecofriendly', '#plantation', '#greenearth'],
      comments: [
        { user: users[0]._id, text: 'Amazing work! Keep going 🌱' },
        { user: users[2]._id, text: 'This is so inspiring!' },
      ],
    },
    {
      author: users[0]._id,
      images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'],
      caption: 'Every small step counts! Started composting at home today. The journey to zero waste begins with one decision.',
      likes: [users[1]._id, users[4]._id],
      hashtags: ['#zerowaste', '#composting', '#sustainability'],
    },
    {
      author: users[4]._id,
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'],
      caption: 'Morning walk through the forest trail. Nature heals everything 🌿',
      likes: [users[0]._id, users[1]._id, users[2]._id, users[5]._id],
      hashtags: ['#nature', '#forest', '#healing'],
    },
    {
      author: users[2]._id,
      images: ['https://images.unsplash.com/photo-1501854140801-50d01674ba3e?w=800'],
      caption: 'Switched to bamboo toothbrushes for the whole family! Small changes, big impact.',
      likes: [users[0]._id, users[3]._id],
      hashtags: ['#bamboo', '#ecofriendly', '#plasticfree'],
    },
    {
      author: users[5]._id,
      images: ['https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800'],
      caption: 'Beach cleanup drive this weekend! Collected 50kg of plastic waste. Together we can make a difference! 🏖️',
      likes: [users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id],
      hashtags: ['#beachcleanup', '#oceanconservation', '#plastichero'],
    },
  ]);
  console.log(`Created ${posts.length} posts`);

  // --- ARTICLES ---
  const articles = await Article.insertMany([
    {
      author: users[1]._id,
      title: '10 Simple Steps to Reduce Waste at Home',
      category: 'DIY Tips',
      content: 'Reducing waste at home is easier than you think. Start by refusing single-use plastics, bring your own bags to the store, and compost food scraps. These small changes can reduce your household waste by up to 80%.\n\nStep 1: Audit your trash. For one week, keep track of everything you throw away.\n\nStep 2: Switch to reusable bags, bottles, and containers.\n\nStep 3: Start composting organic waste.\n\nStep 4: Buy in bulk to reduce packaging.\n\nStep 5: Repair instead of replacing.',
      images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'],
      hashtags: ['#zerowaste', '#DIY', '#ecohome'],
      readingTime: 8,
      likes: [users[0]._id, users[2]._id, users[4]._id],
    },
    {
      author: users[0]._id,
      title: 'The Ultimate Guide to Sustainable Fashion',
      category: 'Education',
      content: 'Fast fashion is one of the biggest polluters in the world. Learn how to build a sustainable wardrobe that looks great and helps the planet.\n\nChoose quality over quantity. Invest in pieces that last years, not weeks. Look for certifications like GOTS and Fair Trade. Support local artisans and thrift stores.',
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'],
      hashtags: ['#sustainablefashion', '#ecostyle'],
      readingTime: 12,
      likes: [users[1]._id, users[3]._id],
    },
    {
      author: users[4]._id,
      title: 'How Solar Energy Can Power Your Future',
      category: 'Technology',
      content: 'Solar energy is becoming more accessible and affordable every year. A typical home solar installation can save you thousands over its lifetime while significantly reducing your carbon footprint.',
      images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800'],
      hashtags: ['#solar', '#renewableenergy', '#greentechnology'],
      readingTime: 6,
    },
  ]);
  console.log(`Created ${articles.length} articles`);

  // --- NEWS ---
  const news = await News.insertMany([
    {
      author: users[1]._id,
      title: 'Organic Gardening',
      content: 'Follows natural growing cycles and relies exclusively on biological processes. Learn how to start your own organic garden with these simple tips.',
      image: 'https://images.unsplash.com/photo-1416870230247-d0a91adb1c67?w=400',
      category: 'Gardening',
    },
    {
      author: users[0]._id,
      title: 'New Solar Panel Technology Breaks Efficiency Record',
      content: 'Researchers have developed a new type of solar cell that achieves 47% efficiency, potentially revolutionizing renewable energy.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
      category: 'Technology',
    },
    {
      author: users[2]._id,
      title: 'Ocean Cleanup Project Removes 100 Tons of Plastic',
      content: 'The massive ocean cleanup initiative has successfully removed over 100 tons of plastic from the Great Pacific Garbage Patch.',
      image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=400',
      category: 'Environment',
    },
  ]);
  console.log(`Created ${news.length} news items`);

  // --- PRODUCTS ---
  const products = await Product.insertMany([
    {
      name: 'Eco Friendly Insulated Green Bottle & Sipper',
      shortDescription: '400 ml | Water Bottle for Office and Gym | Made with Rice Husk',
      description: 'Water Bottle for kids and adults. Made from sustainable rice husk material, this bottle keeps your drinks hot or cold for hours.',
      images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'],
      price: 575,
      originalPrice: 1092,
      discount: 53,
      rating: 4.2,
      ratingsCount: 6875,
      colors: [
        { name: 'pink', hex: '#FFDDC8' },
        { name: 'yellow', hex: '#FFF3B6' },
        { name: 'blue', hex: '#BCDFFF' },
        { name: 'purple', hex: '#D7BFFF' },
      ],
      sizes: [
        { label: '500 ml', value: '500ml' },
        { label: '1 litre', value: '1l' },
        { label: '1.5 litre', value: '1.5l' },
      ],
      category: 'Water Bottles',
      certification: 'Green Seal',
      carbonSaved: '100g',
      plasticSaved: '150g',
      benefits: ['Contemporary', 'Environmental Friendly', 'Earth Friendly', 'Climate Friendly'],
      reviews: [
        {
          user: users[0]._id,
          title: 'Best Quality',
          text: "Received the order on time and it's very good quality but after return policy completed only 1 bottle is changing the color like as rust rest of the bottles are good.",
          rating: 4,
          likes: 69,
          dislikes: 20,
          isVerifiedPurchase: true,
        },
      ],
    },
    {
      name: 'Borosil Eco Copper Bottle',
      shortDescription: '1 litre | Pure Copper Water Bottle',
      description: 'Ayurvedic health benefits with pure copper construction. Keeps water naturally cool.',
      images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600'],
      price: 925,
      originalPrice: 1500,
      discount: 38,
      rating: 4.5,
      ratingsCount: 3200,
      colors: [{ name: 'copper', hex: '#B87333' }],
      sizes: [{ label: '1 litre', value: '1l' }],
      category: 'Water Bottles',
      certification: 'ECOCERT',
      carbonSaved: '200g',
      plasticSaved: '300g',
      benefits: ['Ayurvedic', 'Anti-bacterial', 'Eco Friendly'],
    },
    {
      name: 'Pexpo Echo Delux Hot & Cold',
      shortDescription: '750 ml | Vacuum Insulated Steel Bottle',
      description: 'Double-walled vacuum insulated bottle keeps beverages hot for 12 hours and cold for 24 hours.',
      images: ['https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600'],
      price: 799,
      originalPrice: 1299,
      discount: 39,
      rating: 4.3,
      ratingsCount: 1850,
      category: 'Water Bottles',
      certification: 'Green Seal',
      carbonSaved: '150g',
      plasticSaved: '200g',
      benefits: ['Vacuum Insulated', 'BPA Free', 'Leak Proof'],
    },
    {
      name: 'Bamboo Toothbrush Set (Pack of 4)',
      shortDescription: 'Biodegradable | Charcoal Infused Bristles',
      description: 'Switch to sustainable oral care with these bamboo toothbrushes. Each pack replaces 4 plastic toothbrushes.',
      images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600'],
      price: 299,
      originalPrice: 499,
      discount: 40,
      rating: 4.6,
      ratingsCount: 4500,
      category: 'Beauty & Personal Care',
      certification: 'FSC',
      carbonSaved: '50g',
      plasticSaved: '80g',
      benefits: ['Biodegradable', 'BPA Free', 'Charcoal Infused'],
    },
    {
      name: 'Organic Cotton Tote Bag',
      shortDescription: 'Reusable Shopping Bag | GOTS Certified',
      description: 'Durable, washable, and stylish tote bag made from 100% organic cotton. Perfect for groceries and everyday use.',
      images: ['https://images.unsplash.com/photo-1597484661643-2f5fef26aa4e?w=600'],
      price: 199,
      originalPrice: 399,
      discount: 50,
      rating: 4.8,
      ratingsCount: 7200,
      category: 'Home Essentials',
      certification: 'GOTS',
      carbonSaved: '250g',
      plasticSaved: '500g',
      benefits: ['Reusable', 'Washable', 'Organic Cotton'],
    },
    {
      name: 'Solar Powered USB Charger',
      shortDescription: '10000mAh | Waterproof | Dual USB',
      description: 'Charge your devices anywhere with the power of the sun. Waterproof design perfect for hiking and outdoor adventures.',
      images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600'],
      price: 1499,
      originalPrice: 2999,
      discount: 50,
      rating: 4.1,
      ratingsCount: 2100,
      category: 'Tech & Gadgets',
      certification: 'Energy Star',
      carbonSaved: '1kg',
      plasticSaved: '200g',
      benefits: ['Solar Powered', 'Waterproof', 'Portable'],
    },
  ]);
  console.log(`Created ${products.length} products`);

  // --- CHALLENGES ---
  const challenges = await Challenge.insertMany([
    {
      title: 'Ditch the Plastic',
      description: 'Go a full day without using any single-use plastics.',
      reward: 200,
      rewardDescription: 'Win exclusive gifts',
      category: 'Plastic Free',
      acceptedCount: 5000,
      hoursLeft: 24,
      targetAmount: '4',
      unit: 'kgs',
      conditions: [
        'Include timestamps or before-and-after photos where applicable.',
        'Ensure photos highlight eco-friendly actions clearly (e.g., compost bins, reusable bags, bike rides).',
        'Submissions will be verified by app moderators or through community peer review.',
      ],
      participants: [
        { user: users[8]._id, status: 'completed' },
        { user: users[1]._id, status: 'accepted' },
        { user: users[2]._id, status: 'accepted' },
      ],
    },
    {
      title: 'Green Commute Week',
      description: 'Use public transport, cycle, or walk for all your commutes for a week.',
      reward: 300,
      rewardDescription: 'Earn 300 eco-coins',
      category: 'Green Commuter',
      acceptedCount: 3200,
      hoursLeft: 168,
      targetAmount: '7',
      unit: 'days',
      conditions: [
        'Log your daily commute method.',
        'Upload a photo of your green commute each day.',
      ],
      participants: [
        { user: users[0]._id, status: 'accepted' },
      ],
    },
    {
      title: 'Energy Saver Challenge',
      description: 'Reduce your electricity consumption by 20% this month.',
      reward: 500,
      rewardDescription: 'Free eco-product voucher',
      category: 'Energy Saver',
      acceptedCount: 1800,
      hoursLeft: 720,
      targetAmount: '20',
      unit: '%',
      conditions: [
        'Share your electricity bill comparison (before vs after).',
        'Document the energy-saving measures you implemented.',
      ],
    },
    {
      title: 'Plant a Tree',
      description: 'Plant at least one tree and nurture it for a month.',
      reward: 250,
      rewardDescription: 'Green Thumb badge',
      category: 'Green Thumb',
      acceptedCount: 8500,
      hoursLeft: 720,
      targetAmount: '1',
      unit: 'trees',
      conditions: [
        'Upload a photo of the planted tree with a timestamp.',
        'Follow up with a growth photo after 2 weeks.',
      ],
    },
    {
      title: 'Zero Food Waste Week',
      description: 'Plan your meals and compost all food scraps for one week.',
      reward: 350,
      rewardDescription: 'Waste Warrior badge + coins',
      category: 'Waste Warrior',
      acceptedCount: 2400,
      hoursLeft: 168,
      conditions: [
        'Document your meal planning process.',
        'Show your composting setup.',
        'Share tips that worked for you.',
      ],
    },
  ]);
  console.log(`Created ${challenges.length} challenges`);

  // --- COIN HISTORY ---
  await CoinHistory.insertMany([
    { user: users[0]._id, amount: 200, type: 'earned', description: 'Unlocked free shipping on eco-friendly purchases.' },
    { user: users[0]._id, amount: 200, type: 'redeemed', description: 'Redeemed for discount coupon.' },
    { user: users[0]._id, amount: 300, type: 'earned', description: 'Completed Green Commute Challenge.' },
    { user: users[0]._id, amount: 150, type: 'earned', description: 'First post bonus.' },
    { user: users[0]._id, amount: 190, type: 'redeemed', description: 'Redeemed for eco-product voucher.' },
  ]);
  console.log('Created coin history');

  // --- CHATS ---
  const chats = await Chat.insertMany([
    {
      participants: [users[0]._id, users[2]._id],
      messages: [
        { sender: users[2]._id, content: 'Hey! Did you see the recycled bag?', readBy: [users[2]._id, users[0]._id] },
        { sender: users[0]._id, content: 'Yes! It looks amazing.', readBy: [users[0]._id, users[2]._id] },
        { sender: users[2]._id, content: 'Recycled bag.jpg', type: 'image', readBy: [users[2]._id, users[0]._id] },
      ],
      lastMessage: 'Recycled bag.jpg',
      lastMessageAt: new Date(Date.now() - 3600000),
    },
    {
      participants: [users[0]._id, users[3]._id],
      messages: [
        { sender: users[3]._id, content: 'Sustainability has become such a core value for me.', readBy: [users[3]._id, users[0]._id] },
      ],
      lastMessage: 'Sustainability has become such...',
      lastMessageAt: new Date(Date.now() - 7200000),
    },
    {
      participants: [users[0]._id, users[4]._id],
      messages: [
        { sender: users[4]._id, content: 'Ok', readBy: [users[4]._id] },
      ],
      lastMessage: 'Ok',
      lastMessageAt: new Date(Date.now() - 86400000),
    },
    {
      participants: [users[0]._id, users[5]._id],
      messages: [
        { sender: users[5]._id, content: 'Hey, there', readBy: [users[5]._id] },
        { sender: users[5]._id, content: 'Want to join the beach cleanup?', readBy: [users[5]._id] },
        { sender: users[5]._id, content: 'Its going to be great!', readBy: [users[5]._id] },
      ],
      lastMessage: 'Hey, there',
      lastMessageAt: new Date(Date.now() - 86400000),
    },
  ]);
  console.log(`Created ${chats.length} chats`);

  // --- COMMUNITIES ---
  await Community.insertMany([
    {
      name: 'Green Gardening',
      image: 'https://images.unsplash.com/photo-1416870230247-d0a91adb1c67?w=200',
      members: [users[0]._id, users[1]._id, users[2]._id, users[4]._id],
      messages: [{ sender: users[1]._id, senderName: 'Jessie', content: 'Check out my new herb garden!', type: 'text' }],
      lastMessage: 'Jessie sent a mes...',
      lastMessageAt: new Date(Date.now() - 3600000),
    },
    {
      name: 'Energy Savers',
      image: 'https://images.unsplash.com/photo-1500417148159-68083bd7333a?w=200',
      members: users.map((u) => u._id),
      messages: [{ sender: users[3]._id, senderName: 'Santhosh', content: 'New solar panel tips', type: 'text' }],
      lastMessage: 'Santhosh sent a...',
      lastMessageAt: new Date(Date.now() - 7200000),
    },
    {
      name: 'Recycling Warriors',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200',
      members: [users[0]._id, users[2]._id, users[5]._id],
      messages: [{ sender: users[5]._id, senderName: 'Rakesh', content: 'Recycling workshop tomorrow!', type: 'text' }],
      lastMessage: 'Rakesh sent a me...',
      lastMessageAt: new Date(Date.now() - 10800000),
    },
    {
      name: 'Ecopreneur',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
      members: [users[0]._id, users[1]._id, users[6]._id, users[7]._id],
      messages: [{ sender: users[7]._id, senderName: 'Sridhar', content: '🌿', type: 'sticker' }],
      lastMessage: 'Sridhar sent a stic...',
      lastMessageAt: new Date(Date.now() - 14400000),
    },
    {
      name: 'Sustain Products',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200',
      members: [users[0]._id, users[3]._id, users[4]._id],
      messages: [{ sender: users[3]._id, senderName: 'Narayanan', content: 'New eco products review', type: 'text' }],
      lastMessage: 'Narayanan sent a...',
      lastMessageAt: new Date(Date.now() - 18000000),
    },
  ]);
  console.log('Created communities');

  // --- TIPS ---
  await Tip.insertMany([
    { title: 'Avoid Single-Use Plastics', description: 'Switching to a reusable water bottle saves you money and reduces ocean pollution.' },
    { title: 'Compost Food Scraps', description: 'Composting diverts food waste from landfills and creates nutrient-rich soil for gardens.' },
    { title: 'Use Public Transport', description: 'Taking the bus or train instead of driving can reduce your carbon footprint by up to 50%.' },
    { title: 'Plant a Tree', description: 'A single tree absorbs about 48 pounds of CO2 per year and provides oxygen for two people.' },
    { title: 'Buy Local Produce', description: 'Local food travels fewer miles, supporting local farms and reducing transport emissions.' },
    { title: 'Save Energy at Home', description: 'Turn off lights when leaving a room. LED bulbs use 75% less energy than incandescent ones.' },
    { title: 'Repair, Don\'t Replace', description: 'Fixing things instead of throwing them away reduces waste and saves money.' },
  ]);
  console.log('Created tips');

  console.log('\n✅ Seed complete! You can login with:');
  console.log('   Email: christopher@ecospace.com');
  console.log('   Password: password123');
  console.log('   (or any other seeded user email with the same password)\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
