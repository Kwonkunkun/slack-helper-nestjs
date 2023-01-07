/**
 * [계약서명 규칙]
 * 주계약의 경우 : 계약상대방_계약명_자사명_체결일자
 * 부수계약의 경우 : 계약상대방_본계약명_부속계약명_자사명_체결일자
 *
 * [예시]
 * 주계약 : 솔라원이호_자산양수도계약_솔라에쿼티코리아002_221202
 * 부수계약 : JA솔라_물품공급계약_합의서_엔라이튼_221205
 */
export abstract class FileName {
  private regex = /([^_]+)_([^_]+)_([^_]+)_(\d{6,8})/g;

  /**
   * @protected
   * @param regex
   * @description regex 를 변경할 수 있도록 protected 로 설정
   */
  protected constructor(regex?: RegExp) {
    if (regex) {
      this.regex = regex;
    }
  }

  /**
   * @param fileName 체크해볼 파일 이름
   * @description 파일 이름이 유효한지 확인
   */
  isValid(fileName: string): boolean {
    return this.regex.test(fileName);
  }

  /**
   * @param args 체크해볼 파일 이름
   * @description args 를 받아 파일 이름을 만들어줌
   */
  getFileName(...args: string[]): string {
    return args.join('_');
  }

  /**
   * @param fileName 나눌 파일 이름
   * @description 파일 이름을 분해해서 배열로 반환
   */
  separateFileName(fileName: string): string[] {
    this.regex.lastIndex = 0;
    return this.regex.exec(fileName).slice(1);
  }
}
