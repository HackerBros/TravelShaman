#
# Cookbook Name:: startnode
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
# Start the chosen node app with a chosen port
execute "start-node" do
    user "www-data"
    not_if( "ps l -Cnode|grep #{node[:startnode][:start_file]} #{node[:startnode][:port]}" )
    command "node #{node[:startnode][:start_file]} #{node[:startnode][:port]} &"
end

