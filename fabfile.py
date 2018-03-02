from fabric.api import env, settings, cd, run, sudo, prefix, local, put
from contextlib import contextmanager

env.use_ssh_config = True
env.hosts = ['seedraid']

REPO = 'http://github.com/wow-sweetlie/seed_raid.git'
APP_DIR = '/home/seedraid/app'
ASSETS_DIR = '/home/seedraid/app/assets'


def deploy():
    sync_changes()

    with cd(APP_DIR):
        run("MIX_ENV=prod mix deps.get --only prod")
        run("MIX_ENV=prod mix compile")
        run("MIX_ENV=prod mix ecto.migrate")

        with cd(ASSETS_DIR):
            run("yarn install")
            run("sudo systemctl stop seedraid.service")
            run("rm -rf priv/static/*")
            run("yarn deploy")
        run("MIX_ENV=prod mix phx.digest")
        run("MIX_ENV=prod PORT=4000 mix run priv/repo/seeds.exs")
        run("MIX_ENV=prod PORT=4000 mix pins.parse_all")
        run("MIX_ENV=prod PORT=4000 mix discord.all_members")
        local("$HOME/bin/sentry-seedraid-release")
        run("sudo systemctl start seedraid.service")


def sync_changes():
    local("git push")
    with settings(warn_only=True):
        app_exists = not run('test -d %s' % APP_DIR).failed

    if not app_exists:
        run('git clone %s %s' % (REPO, APP_DIR))
    else:
        with cd(APP_DIR):
            run('git pull')

    with cd(APP_DIR):
        put("./config/prod.secret.exs", "./config/prod.secret.exs")
