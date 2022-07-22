export class Notifier {
  public notificationsEnabled = false;

  public userAllowsNotifications = false;

  private permissionsStatus: PermissionStatus;
  private revocationCallbacks: Set<() => void> = new Set();

  constructor() {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "notifications" }).then((status) => {
        if (status.state !== "granted") {
          this.permissionsRevoked();
        }

        status.addEventListener("change", (e) => {
          if (status.state !== "granted") {
            this.permissionsRevoked();
          }
        });
      });
    }
  }

  private hasAPI() {
    return window && "Notification" in window;
  }

  async requestPermissions() {
    if (!this.hasAPI()) return;

    if (Notification.permission === "granted") {
      this.userAllowsNotifications = true;
      return;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        this.userAllowsNotifications = true;
        return;
      }
    }

    this.userAllowsNotifications = false;
  }

  onPermissionsRevoked(cb: () => void) {
    this.revocationCallbacks.add(cb);
  }

  removeOnPermissionsRevoked(cb: () => void) {
    if (this.revocationCallbacks.has(cb)) {
      this.revocationCallbacks.delete(cb);
    }
  }

  private permissionsRevoked() {
    for (const cb of this.revocationCallbacks) {
      cb();
    }
  }

  notify(title: string, message: string) {
    if (!this.notificationsEnabled || !this.userAllowsNotifications) return;

    const n = new Notification(title, { body: message });
  }
}

export const notifierKey = "notifierKey";
