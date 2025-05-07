<template>
    <div class="SaveScroll flex gap-4 flex-col">
        <BoatCard title="宇宙起源">
            <section>
                <h2 class="subtitle">大爆炸理论核心框架</h2>
                <p class="content">
                    现代宇宙学的主流理论认为，宇宙起源于约138亿年前的一次奇点大爆炸。在初始的10^-43秒（普朗克时间）内，量子引力效应主导着温度达10^32K的超高能环境。随着暴胀阶段（10^-36秒至10^-32秒）的指数级膨胀，量子涨落被拉伸为宇宙大尺度结构种子。至大爆炸后38万年，复合时代开启，电子与原子核结合形成中性原子，释放的余晖即宇宙微波背景辐射（CMB），成为当今探测早期宇宙的"化石证据"。
                </p>
            </section>

            <section>
                <h3 class="subtitle">关键观测证据链</h3>
                <ul class="content">
                    <li>
                        <strong>哈勃定律与宇宙膨胀</strong
                        >：1929年埃德温·哈勃发现星系退行速度与距离成正比（v=H₀D），红移现象印证弗里德曼方程预言的动态宇宙模型
                    </li>
                    <li>
                        <strong>轻元素核合成</strong
                        >：宇宙初期高温环境促成氢氦锂的合成，实测氦-4丰度（24%）与理论预测高度吻合
                    </li>
                    <li>
                        <strong>CMB各向异性</strong
                        >：COBE（1992）、WMAP（2003）、普朗克卫星（2013）相继绘制CMB温度涨落图，10^-5量级的微小起伏对应星系团雏形
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="subtitle">未解之谜与前沿探索</h3>
                <p class="content">
                    当前理论仍面临多重挑战：暴胀场的本质尚未明确，暗物质粒子候选体（如WIMPs、轴子）的探测尚无定论，暗能量导致加速膨胀的机制更是被《科学》杂志列为125个重大科学问题之首。詹姆斯·韦伯望远镜（JWST）近期发现的早期超大质量星系（红移z≈16）可能暗示标准模型需要修正。
                </p>
            </section>
        </BoatCard>

        <BoatCard title="研究历程">
            <section>
                <h3 class="subtitle">认知革命三阶段</h3>
                <div class="content">
                    <h3>地心说破灭（1543-1687）</h3>
                    <p>
                        哥白尼《天体运行论》引发日心说革命，第谷·布拉赫精密观测数据开定量研究先河，牛顿力学体系建立宇宙动力学基础
                    </p>
                </div>
                <div class="content">
                    <h4>银河系尺度突破（1912-1950）</h4>
                    <p>
                        勒维特发现造父变星周光关系（1912），哈勃确认仙女座星系河外属性（1925），爱因斯坦场方程开启相对论宇宙学
                    </p>
                </div>
            </section>

            <section>
                <h3 class="subtitle">现代宇宙学五大里程碑</h3>
                <ul class="content">
                    <li>1965年：彭齐亚斯和威尔逊意外发现3K微波背景辐射</li>
                    <li>1998年：超新星观测揭示宇宙加速膨胀，暗能量假设提出</li>
                    <li>2016年：LIGO首次直接探测到引力波（GW150914）</li>
                </ul>
            </section>
        </BoatCard>

        <!-- 理论体系模块 -->
        <BoatCard title="理论体系">
            <section>
                <h3 class="subtitle">标准宇宙学模型（ΛCDM）</h3>
                <table class="model-params">
                    <tr>
                        <th>组分</th>
                        <th>占比</th>
                        <th>特性</th>
                    </tr>
                    <tr>
                        <td>普通物质</td>
                        <td>4.9%</td>
                        <td>构成恒星、行星等可见物质</td>
                    </tr>
                    <tr>
                        <td>暗物质</td>
                        <td>26.8%</td>
                        <td>通过引力效应影响结构形成</td>
                    </tr>
                    <tr>
                        <td>暗能量</td>
                        <td>68.3%</td>
                        <td>驱动宇宙加速膨胀</td>
                    </tr>
                </table>
            </section>

            <section>
                <h3 class="subtitle">竞争性理论比较</h3>
                <div class="theory-compare">
                    <div class="theory">
                        <h4>循环宇宙论</h4>
                        <p>
                            彭罗斯共形循环理论主张宇宙经历无限次大爆炸-大挤压循环，CMB中的霍金点可能是前宇宙黑洞蒸发的遗迹
                        </p>
                    </div>
                    <div class="theory">
                        <h4>膜宇宙假说</h4>
                        <p>
                            基于弦理论认为三维宇宙漂浮在高维"体空间"，2017年提出的Ekpyrotic模型尝试解释CMB各向异性
                        </p>
                    </div>
                </div>
            </section>
        </BoatCard>
    </div>
</template>

<script lang="ts" setup>
import { useSaveScroll } from '@/hooks/useSaveScroll';

useSaveScroll('SaveScroll');
</script>

<style lang="scss">
.BoatCard {
    .subtitle {
        @apply text-h1 mb-4;
    }
    .content {
        @apply text-h1 font-style-3 mb-4;
    }
    .model-params {
        @apply w-full border-collapse;
        td,
        th {
            @apply border  p-3 text-left;
        }
    }
    .theory-compare {
        @apply grid md:grid-cols-2 gap-6;
    }
}
</style>
