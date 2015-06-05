# Docker Virtual Hosts

docker-virtual-hosts sets up a container running a web service listing your docker virtual hosts. It is intended to be used with [nginx-proxy][1] but it can also be used on its own.

## Usage

To run it:

    $ docker run -it -e VIRTUAL_HOST=dev.127.0.0.1.xip.io -v /var/run/docker.sock:/tmp/docker.sock:ro --name virtual_hosts texthtml/docker-vhosts

If `nginx-proxy` is running and listening on 127.0.0.1, you can visit http://dev.127.0.0.1.xip.io/ to see your other(s) virtual host(s).

Every containers with a `VIRTUAL_HOST=...` env var set should be present. You can also add labels to your containers with `VIRTUAL_LABELS=some spaces separated labels`. You we will then be able to filter yout vhosts using those labels.

[1]: https://github.com/jwilder/nginx-proxy
