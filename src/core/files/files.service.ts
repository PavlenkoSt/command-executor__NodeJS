import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export class FilesService {
  getFilePath(path: string, filename: string, extension: string) {
    if (isAbsolute(path)) {
      path = join(dirname(path), path);
    }

    return join(path, `${filename}.${extension}`);
  }

  async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  async removeIfExist(path: string) {
    const isExist = await this.isExist(path);

    if (isExist) {
      await promises.unlink(path);
    }
  }
}
