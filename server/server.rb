
require "web_socket"
require "thread"

server = WebSocketServer.new(
  :accepted_domains => [ARGV[0]],
  :port => ARGV[1].to_i())



puts("serveur lancé")
connections = []


server.run() do |ws|
	begin
    puts("Connection accepted")
    ws.handshake()
    que = Queue.new()
    connections.push(que)


	rescue




	end 
end 
