name "nodeapp"
description "node.js webapp with redis"
run_list *%w[
    recipe[nodejs]
    recipe[redisio::install]
    recipe[redisio::enable]
    recipe[startnode]
]

default_attributes({
    'redisio' => {
        'default_settings' => {'datadir' => '/vagrant/db'},
#        'servers' => [
#            {'name' => 'master', 'port' => '6379', 'unixsocket' => '/tmp/redis.sock', 'unixsocketperm' => '755'},
#        ]
    },
    'startnode' => {
        'start_file' => '/vagrant/server/app.js',
        'port' => '8080'
    }
})
