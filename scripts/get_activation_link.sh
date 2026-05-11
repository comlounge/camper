#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
"$DIR/../../../bin/python" "$DIR/get_activation_link.py" "$@"
