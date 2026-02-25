/**
 * Project Detector
 * 检测项目类型和技术栈
 */
import type { DetectionResult } from '../types.js';
export declare class ProjectDetector {
    /**
     * 检测当前目录的项目类型
     */
    detect(cwd?: string): Promise<DetectionResult>;
    /**
     * 根据检测结果推荐配置
     */
    private getRecommendedConfigs;
}
//# sourceMappingURL=detector.d.ts.map