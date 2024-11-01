
_SHELL="$(ps "${$}" | grep "${$} " | grep -v grep | sed -rn "s/.*[-\/]+(bash|z?sh) .*/\1/p")"; # bash || sh || zsh
case ${_SHELL} in
  zsh)
    _DIR="$( cd "$( dirname "${(%):-%N}" )" && pwd -P )"
    _0="$( basename "${(%):-%N}" )"
    _SCRIPT="${(%):-%N}"
    _BINARY="/bin/zsh"
    _PWD="$(pwd)"
    ;;
  sh)
    _DIR="$( cd "$( dirname "${0}" )" && pwd -P )"
    _0="$( basename "${0}" )"
    _SCRIPT="${0}"
    _BINARY="/bin/sh"
    _PWD="$(pwd)"
    ;;
  *)
    _DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"
    _0="$( basename "${BASH_SOURCE[0]}" )"
    _SCRIPT="${BASH_SOURCE[0]}"
    _BINARY="/bin/bash"
    _PWD="$(pwd)"
    ;;
esac

cd "${_DIR}/.."

set -x
rm -rf .env*
rm -rf .git
rm -rf .github
rm -rf .gitignore
rm -rf .husky
rm -rf .npmignore
rm -rf .nvmrc
rm -rf .prettierignore
rm -rf .vscode
rm -rf bash
rm -rf commitlint.config.*
rm -rf jest.config.*
rm -rf LICENSE
rm -rf package.dev.json
rm -rf package.json
rm -rf prettier.config.*
rm -rf README.md
rm -rf release.config.*
rm -rf yarn.lock


echo 'after clean_before_github_pages'

ls -la