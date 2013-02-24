#
# Cookbook Name:: startnode
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
# Start the chosen node app with a chosen port
bash "start-node" do
  user "www-data"
  code <<-EOH
    nodemon #{node[:startnode][:start_file]} #{node[:startnode][:port]} &
    EOH
    not_if "ps l -Cnode|grep #{node[:startnode][:start_file]} #{node[:startnode][:port]}"
end

