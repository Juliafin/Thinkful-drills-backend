# `set -e` causes the script to immediately
# exit if an error occurs
set -e

# this script determines whether or not
# to run Node using Harmony flags, depending
# on the version of Node that's running. In
# this course, this allows us to run our apps
# on HyperDev (which is on Node 4.x) and locally
# (where we're on Node 6.x) using a single script.
#
# the code below says that if the Node version on
# the computer is less than or equal to 5.x, run with
# harmony flags (which enable use of a subset of es6)
# features.  If we're on <= 5.x, the app will be started
# with `node --harmony --harmony_destructuring server.js`.
# If we're on Node >= 6.x, the `HARMONY_FLAGS`
# variable will be an empty string, in which case the
# app will be started as `node server.js`

MAX_HARMONY_VERSION=5
NODE_VERSION=$(node -v | grep -o 'v[0-9]')
HARMONY_FLAGS=""

if [[ ${NODE_VERSION:1:1} -le $MAX_HARMONY_VERSION ]]; then
	echo "Running with harmony for select es6 support"
	HARMONY_FLAGS="--harmony --harmony_destructuring"
fi

node $HARMONY_FLAGS server.js
