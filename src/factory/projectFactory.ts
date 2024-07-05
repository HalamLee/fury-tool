import { Factory, ReactProjectFactory, VueProjectFactory, ExpressProjectFactory } from './'
import { OperationFailException } from '../exception'

import { jsPackageJson, tsPackageJson, tsConfig } from '../templates'

import { ProjectInfo } from '../interfaces/project'

export class ProjectFactory extends Factory {
  /**
   * @desc Constructor to initialize ProjectFactory with project information.
   * @param {ProjectInfo} projectInfo - The project information.
   */
  constructor(projectInfo: ProjectInfo) {
    super(projectInfo)
  }

  /**
   * @name setup
   * @desc setup the project with default settings.
   * @example
   * await factory.setup();
   */
  async setup() {
    // 1. Directory 생성
    const sWorkPath = await this.FileUtil.createDirectory(
      this.sWorkDir,
      this.projectInfo.projectName
    )

    // 2. 설정 파일 생성
    await this.FileUtil.createFile(
      sWorkPath,
      'package.json',
      JSON.stringify(jsPackageJson, null, 2)
    )
    if (this.projectInfo.useTypescript) {
      await this.FileUtil.createFile(
        sWorkPath,
        'tsconfig.json',
        JSON.stringify(tsPackageJson, null, 2)
      )
    }

    // 3. 프로젝트 기본 구조 생성
  }

  /**
   * @name getFactory
   * @desc Get the specific factory based on the framework type.
   * @returns {BaseFactory} The specific project factory.
   * @example
   * const factory = new ProjectFactory(projectInfo).getFactory();
   */
  public getFactory(): Factory {
    switch (this.projectInfo?.frameworkType) {
      case 'react': {
        return new ReactProjectFactory(this.projectInfo)
      }

      case 'vue': {
        return new VueProjectFactory(this.projectInfo)
      }

      case 'express': {
        return new ExpressProjectFactory(this.projectInfo)
      }

      default: {
        return this
      }
    }
  }
}
