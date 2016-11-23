Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_check_update = false
  config.vm.synced_folder "shared/", "/shared", create: true
  
  config.vm.define "machine" do |server|
    server.vm.provider "virtualbox" do |vb|
	     vb.customize ["modifyvm", :id, "--cpus", "2"]
       vb.name = "machine"
       vb.memory = 2048
    end
    server.vm.hostname = "machine"
    server.vm.network :private_network, ip: "192.168.15.100"
    server.vm.provision :shell, path: "provision", args: ENV['ARGS']
  end
end
