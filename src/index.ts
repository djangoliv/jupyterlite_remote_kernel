import {
  IKernelSpecManager,
  IKernelManager,
  ISessionManager,
  Kernel,
  KernelManager,
  KernelSpec,
  KernelSpecManager,
  ServerConnection,
  Session,
  SessionManager,
  ServiceManagerPlugin
} from '@jupyterlab/services';

const baseUrl = 'http://127.0.0.1:8888';
const token = '';

const kernelSpecManagerPlugin: ServiceManagerPlugin<KernelSpec.IManager> = {
  id: 'jupyterlite-remote-kernel:service',
  description: 'Provide a remote KernelSpec manager',
  autoStart: true,
  provides: IKernelSpecManager,
  activate: (): KernelSpec.IManager => {
    console.log('Activating remote KernelSpecManager');
    const remoteServerSettings = ServerConnection.makeSettings({
      baseUrl,
      token
    });
    const manager = new KernelSpecManager({
      serverSettings: remoteServerSettings
    });
    void manager.refreshSpecs().then(() => {
      console.log(
        'Remote kernels available:',
        Object.keys(manager.specs?.kernelspecs || {})
      );
    });
    return manager;
  }
};

const kernelManagerPlugin: ServiceManagerPlugin<Kernel.IManager> = {
  id: 'jupyterlite-remote-kernel:kernel-manager',
  description: 'The kernel manager plugin.',
  autoStart: true,
  provides: IKernelManager,
  activate: (): Kernel.IManager => {
    console.log('Using the RemoteKernelManager');
    const remoteServerSettings = ServerConnection.makeSettings({
      baseUrl,
      token
    });
    const remoteKernelManager = new KernelManager({
      serverSettings: remoteServerSettings
    });
    return remoteKernelManager;
  }
};

const sessionManagerPlugin: ServiceManagerPlugin<Session.IManager> = {
  id: 'jupyterlit-remote-kernel:session-manager',
  description: 'The session manager plugin',
  autoStart: true,
  provides: ISessionManager,
  requires: [IKernelManager],
  activate: (_: null, kernelManager: Kernel.IManager): Session.IManager => {
    console.log('Using the RemoteSessionManager');
    const remoteServerSettings = ServerConnection.makeSettings({
      baseUrl,
      token
    });
    const sessionManager = new SessionManager({
      kernelManager,
      serverSettings: remoteServerSettings
    });
    return sessionManager;
  }
};

const plugins = [
  kernelSpecManagerPlugin,
  kernelManagerPlugin,
  sessionManagerPlugin
];
export default plugins;
