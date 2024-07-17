import { Command } from './'
import { GIT_INIT_PROMPT, INIT_SETTING, COMMIT_INFO } from '../constants'
import { GitException, AlreadyExistException, NoDataException } from '../exception'

import { GitInfo } from '../interfaces/git'

export class GitManage extends Command {
  private gitInfo: GitInfo = {} as GitInfo
  private sWorkDir: string = process.cwd()

  async prepare(): Promise<void> {
    // 0. Child Command 선택
    const gitInitResponse = await this.Prompt.call(GIT_INIT_PROMPT)
    this.CommonUtil.validateRequireFields(
      gitInitResponse,
      GIT_INIT_PROMPT.map(prompt => String(prompt.name))
    )

    Object.assign(this.gitInfo, gitInitResponse)

    // 1. init을 제외한 커맨드에서 validation 수행
    if (this.gitInfo.subCommand !== 'init') {
      await this.checkValidation()
    }
  }

  async execute(): Promise<void> {
    switch (this.gitInfo.subCommand) {
      case 'init': {
        await this.initGit()
        break
      }

      case 'push': {
        await this.pushGit()
        break
      }

      case 'pull': {
        await this.pullGit()
        break
      }

      case 'merge': {
        await this.mergeGit()
        break
      }

      case 'branch': {
        await this.branchManage()
        break
      }
    }
  }

  async finalize(): Promise<void> {
    //ENHANCE: -. gitManage에선 굳이 필요한가?
  }

  async rollback(): Promise<void> {
    // 99. 에러가 발생한 지점 파악
    // 99-1. Roollback 사전 준비
    // 99-2. Rollback 수행
  }

  /**
   * @name checkValidation
   * @desc Checks for the existence of the .git directory and throws an error if it does not exist.
   * @example await this.checkValidation();
   */
  private async checkValidation() {
    const checkRunner = this.Spinner.get().start('🔎  Verifying project setup...')

    // 0. git 설치 여부 검증
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    // 1. .git 파일 존재 검증
    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    const bCheckFlag = await this.FileUtil.checkExist(sPath)

    if (!bCheckFlag) {
      checkRunner.fail()
      throw new GitException('init')
    }

    checkRunner.succeed('Verification completed')
  }

  /**
   * @name initGit
   * @desc Performs Git initialization.
   * @example await this.initGit();
   */
  private async initGit() {
    // 0. git이 설치되어있지 않거나 .git이 이미 존재하는 프로젝트라면 예외 처리
    try {
      await this.Launcher.run('git', ['-v'])
    } catch (error) {
      throw new GitException('notInstall')
    }

    const sPath = this.FileUtil.makePath(this.sWorkDir, '.git')
    if (await this.FileUtil.checkExist(sPath)) {
      throw new AlreadyExistException('.git')
    }

    // 1. git init 명령어 수행
    await this.Launcher.run('git', ['init'], this.sWorkDir)

    // 2. 관련 정보 취득 (prompt)
    const response = await this.Prompt.call(INIT_SETTING)
    this.CommonUtil.validateRequireFields(
      response,
      INIT_SETTING.map(prompt => String(prompt.name))
    )
    Object.assign(this.gitInfo, response)

    // 3. remote origin 설정
    this.Launcher.run('git', ['remote', 'add', 'origin', this.gitInfo.remoteUrl], this.sWorkDir)

    if (this.gitInfo.useFirstCommit) {
      // 4. first commit 수행
      await this.Launcher.run('git', ['add', '.'], this.sWorkDir)
      await this.Launcher.run('git', ['commit', '-m', ':sparkles: Project Initial'], this.sWorkDir)
      await this.Launcher.run('git', ['push', '-u', 'origin', 'master'], this.sWorkDir)
    }
  }

  /**
   * @name pushGit
   * @desc Performs Git push operation.
   * @example await this.pushGit();
   */
  private async pushGit() {
    // 1. commit 관련 정보 취득 (prompt)
    const response = await this.Prompt.call(COMMIT_INFO)
    this.CommonUtil.validateRequireFields(
      response,
      COMMIT_INFO.map(prompt => String(prompt.name))
    )
    Object.assign(this.gitInfo, response)

    // 2. Changes를 Staged로 이관
    await this.Launcher.run('git', ['add', '.'], this.sWorkDir)

    // 3. Commit 수행
    await this.Launcher.run('git', [
      'commit',
      '-m',
      `${this.gitInfo.commitType} ${this.gitInfo.commitMessage}`,
      this.sWorkDir
    ])

    // 4. Push 수행
    if (this.gitInfo.pushPermission) {
      await this.Launcher.run('git', ['push', '-u', 'origin'], this.sWorkDir)
    }
  }

  /**
   * @name pullGit
   * @desc Performs Git pull operation.
   * @example await this.pullGit();
   */
  private async pullGit() {
    // 1. 현재 Branch 정보 취득
    const sBranchList = await this.Launcher.run('git', ['branch'], this.sWorkDir)
    const sCurrentBranch = sBranchList.split('\n').find(sBranch => sBranch.includes('*'))?.replace('*', '').trim()

    if (sCurrentBranch === undefined) {
      throw new NoDataException('currentBranch')
    }

    // 2. Remote Branch 정보 취득
    const sAllBranchList = await this.Launcher.run('git', ['branch', '-a'], this.sWorkDir)

    // 3. Remote에 해당 Branch가 존재하는지 확인
    const bExistFlag = sAllBranchList.split('\n').some(sBranch => {
      if (sBranch.split('/').length > 1) {
        const arrBranchInfo = sBranch.split('/')

        if (arrBranchInfo[arrBranchInfo.length - 1] === sCurrentBranch) {
          return true
        }
      }
    })

    if (!bExistFlag) {
      throw new GitException('')
    }

    // 4. Pull 수행
  }

  /**
   * @name mergeGit
   * @desc Performs Git merge operation.
   * @example await this.mergeGit();
   */
  private async mergeGit() {
    // 1. 현재 Branch 정보 취득
    // 2. 전체 Branch 목록 취득
    // 3. 대상 Branch 취득 (prompt)
    // 4. Merge 수행
  }

  /**
   * @name branchManage
   * @desc Performs related to Git Branch management.
   * @example await this.branchManage()
   */
  private async branchManage() {
    // 0. subCommand 정보 취득 (prompt)
    // --------------------------------------------
    // 1. 생성
    // 1-1. 필요 정보 취득 (prompt)
    // 1-2. 수행
    // --------------------------------------------
    // 2. 이름 변경
    // 2-1. 필요 정보 취득 (prompt)
    // 2-2. 수행
    // --------------------------------------------
    // 3. 삭제
    // 3-1. 필요 정보 취득 (prompt)
    // 3-2. 수행
    // --------------------------------------------
  }
}
