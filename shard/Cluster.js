const Cluster = require('discord-hybrid-sharding');

const manager = new Cluster.Manager(`${process.cwd()}/index.js`, {
  totalShards: 'auto',
  shardsPerClusters: 2,
  totalClusters: 'auto',
  mode: 'process',
  token: process.env.TOKEN,
});

manager.extend(
  new Cluster.HeartbeatManager({
    interval: 2000,
    maxMissedHeartbeats: 5,
  }),
);

manager.on('clusterCreate', (cluster) => {
  console.log(`[CLIENT] Launched Cluster ${cluster.id}`);

  cluster.on('ready', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} seems ready`);
  });

  cluster.on('reconnecting', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} is reconnecting`);
  });

  cluster.on('disconnect', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} disconnected`);
  });

  cluster.on('death', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} died`);
  });

  cluster.on('error', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} errored`);
  });

  cluster.on('spawn', () => {
    console.log(`[CLIENT] Cluster ${cluster.id} has spawned`);
  });
});
manager.spawn({ timeout: -1 });
console.log(Cluster)
