import type { ExtensionContext } from 'vscode'

// import * as path from 'path'
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node'

let client: LanguageClient

export function activate(context: ExtensionContext) {
  const serverModule = require.resolve('@aeria-lang/language-server')
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc
    }
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{
      scheme: 'file',
      language: 'aeria'
    }],
  }

  client = new LanguageClient(
    'aeriaLanguageServer',
    'Aeria Language Server',
    serverOptions,
    clientOptions,
  )

  client.start()
}

export function deactivate() {
  if( client ) {
    client.stop()
  }
}

