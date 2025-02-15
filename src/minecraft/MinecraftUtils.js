class MinecraftUtils {
  constructor() {
    this.API_BASE = "https://web-lab.xyz/api";
  }

  // Sunucu durumunu çekme
  async getServerStatus(ip, type = "java") {
    try {
      const url =
        type.toLowerCase() === "bedrock"
          ? `${this.API_BASE}/status/${ip}?bedrock=true`
          : `${this.API_BASE}/status/${ip}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // API yanıtını standartlaştır
      return {
        online: true, // API her zaman online sunucuları döndürüyor
        players: {
          online: data.players?.online || 0,
          max: data.players?.max || 0,
        },
        version: data.version?.name || data.version || "Unknown",
        motd: data.motd?.clean || data.motd || "",
        ping: data.ping || 0,
      };
    } catch (error) {
      throw new Error(`Failed to get server status: ${error.message}`);
    }
  }

  // Sunucu ikonunu çekme
  async getServerIcon(ip) {
    try {
      const url = `${this.API_BASE}/icon/dynamic?address=${ip}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Buffer olarak döndür
      return await response.arrayBuffer();
    } catch (error) {
      throw new Error(`Failed to get server icon: ${error.message}`);
    }
  }

  // MOTD banner'ını çekme
  async getServerBanner(ip) {
    try {
      const url = `${this.API_BASE}/banner/${ip}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Buffer olarak döndür
      return await response.arrayBuffer();
    } catch (error) {
      throw new Error(`Failed to get server banner: ${error.message}`);
    }
  }

  // Sunucu bilgilerini tam olarak çekme
  async getServerInfo(ip, type = "java") {
    try {
      const [status, iconBuffer, bannerBuffer] = await Promise.all([
        this.getServerStatus(ip, type),
        this.getServerIcon(ip).catch(() => null),
        this.getServerBanner(ip).catch(() => null),
      ]);

      // Buffer'ları base64'e çevir
      const icon = iconBuffer ? this.arrayBufferToBase64(iconBuffer) : null;
      const banner = bannerBuffer
        ? this.arrayBufferToBase64(bannerBuffer)
        : null;

      return {
        status,
        icon,
        banner,
        type,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Failed to get server info: ${error.message}`);
    }
  }

  // ArrayBuffer'ı base64'e çevirme
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    const binary = bytes.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${Buffer.from(binary, "binary").toString(
      "base64"
    )}`;
  }
}

export default MinecraftUtils;
