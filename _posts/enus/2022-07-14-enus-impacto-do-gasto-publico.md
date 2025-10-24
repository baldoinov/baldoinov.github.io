---
layout: post
title: What is the impact of public spending on the number of deaths in Brazilian cities?
lang: en
date: 2022-07-14
---



> [!IMPORTANT] Disclaimer
> This post was originally written in Brazilian Portuguese, and as a result, the equations and elements in the charts may contain words in the original language.



This study aims to understand how certain economic variables influence the number of deaths in Brazilian cities. To do so, a cross-section of municipalities is used, which includes the dependent variable — the number of deaths — and potential explanatory variables such as municipal budget expenditures, total population, geographic region, and educational indicators. The investigation engages with the approach proposed by other studies that have also analyzed the relationship between socioeconomic factors and mortality {% cite USMortalityEconomic_1995_SorlieEtAl %}.


## Descrição dos Dados


The dataset used in this study was compiled by the author; the raw datasets used to acquire the data can be accessed through the *Base dos Dados* portal {% cite Base_dos_Dados_Base_dos_Dados %} (a complete list of the datasets used can be found in the references). Additionally, the *scripts* used for data processing, aggregation, and modeling can be found on _GitHub_ [^1].

![](/assets/images/impacto-do-gasto-publico/qual-o-impacto-do-gasto-publico.png)

As shown in the left-hand chart, municipalities from all regions exhibit a positive association between the *log* of the number of deaths and the *log* of total security expenditure. This is counterintuitive, as one would expect the chart to show a negative relationship. This contradiction will be further explored in the regression models.

In the right-hand chart, the association between the *logs* of the number of deaths and population is displayed. An interesting observation in the upper distribution chart is that the *log* of the number of deaths in the Northeast region, compared to other regions, is concentrated at a slightly higher level and exhibits lower variance.


## Modelos de Regressão

A abordagem para estimar o impacto de variáveis econômicas no número de óbitos de um município consiste em estimar três modelos:

$$
log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_3 log(\text{Despesa}) + \beta_4 \text{Evasão-EM} + \beta_5 \text{Nordeste} + u_i
$$

$$
log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2\text{Emprego} + \beta_3 log(\text{Seg}) + \beta_4\text{Evasão-EM} + \beta_5\text{Nordeste} + u_i
$$

$$
log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_{i, i = \{3, 4, 5\} } log(\text{Despesas}) + \beta_{i, i = \{6, 7\} } \text{Educação} + \beta_8\text{Nordeste} + u_i
$$

Nestes modelos, as variáveis "``log(Pop)``", "``Emprego``", "``Evasão-EM``" representam o *log* da população, o tempo médio que um trabalhador permance empregado e a taxa de evasão do ensino médio de cada município, respectivamente. A variável "``Nordeste``" é uma *dummy* que assume o valor 1 se a cidade observada é na região nordeste do país e 0 caso contrário. Espera-se que as variáveis "``log(Pop)``" e "``Evasão-EM``" possuam um sinal positivo, a primeira porque é natural que municípios maiores apresentem um maior número de óbitos e a última para refletir a intuição de que uma maior evasão escolar está relacionada à um baixo nível de instrução e, consequentemente, a uma qualidade de vida menor e expectativa de vida mais curta. O sinal esperado da variável "``Emprego``" é positivo, relefetindo a ideia de que uma permanência maior em um emprego, na média, tende a aumentar a qualidade de vida de um trabalhador e, portanto, diminuir as chances de óbito.

No primeiro e segundo modelo, as variáveis "``log(Despesa)``" e "``log(Seg)``" são o *log* da despesa orçamentária total do município e o *log* do gasto em segurança público do município, respectivamente. No terceiro modelo, a variável representada como "``log(Despesas)``" contém o *log* da despesa orçamentária do município com segurança, assistência social e previdência. Esses gastos foram isolados e representados separadamente por se pensar que eles sejam mais importante para explicar o número de óbitos da cidade. Adicionalmente, espera-se que o sinal das variáveis de despesas orçamentárias seja negativo em todos os modelos, intuitivamente, esse sinal captaria a ideia que um gasto público maior tem a capacidade de aumentar o bem-estar geral e diminuir o número de óbitos do município.

No terceiro e último modelo, o componente "``Educação``" e seus subscritos indicam a variável "``Evasão-EM``", presente nos modelos anteriores, e a variável "``Aluno/Turma-EM``", que é a média de alunos por turma para aquele município. Essas variáveis foram condensadas no componente "``Educação``" para poupar espaço. Assim como nos outros modelos que possuem indicadores relacionados à educação, o sinal esperado dessas variáveis é positivo, transmitindo a ideia de que a piora nos indicadores educacionais aumente o número de óbitos.

### Modelo 01

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_3 log(\text{Despesa}) + \beta_4 \text{Evasão-EM} + \beta_5 \text{Nordeste} + u_i$$

<style>
.table-reg {
  border-collapse: collapse;
  margin: 20px auto;
  font-family: "Times New Roman", serif;
  font-size: 14px;
  text-align: center;
}
.table-reg th, .table-reg td {
  padding: 4px 8px;
}
.table-reg thead tr:first-child th {
  border-bottom: 1px solid black;
}
.table-reg tbody tr:last-child td {
  border-top: 1px solid black;
}
.table-reg tfoot td {
  font-style: italic;
  font-size: 12px;
  text-align: left;
  padding-top: 6px;
}
</style>

<table class="table-reg">
  <caption style="caption-side:top; text-align:center; font-weight:normal; margin-bottom:6px;">
    Table 1: Modelo 01 - Regressão Linear
  </caption>
  <thead>
    <tr>
      <th></th>
      <th colspan="2">Estimate (S.E.)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(Intercept)</td>
      <td>-4.5198<sup>*</sup></td>
      <td>(0.085)</td>
    </tr>
    <tr>
      <td>log_populacao</td>
      <td>0.9482<sup>*</sup></td>
      <td>(0.004)</td>
    </tr>
    <tr>
      <td>tempo_medio_emprego</td>
      <td>0.0010<sup>*</sup></td>
      <td>(0.000)</td>
    </tr>
    <tr>
      <td>log_despesa</td>
      <td>0.0032</td>
      <td>(0.004)</td>
    </tr>
    <tr>
      <td>taxa_abandono_em</td>
      <td>-0.0143<sup>*</sup></td>
      <td>(0.001)</td>
    </tr>
    <tr>
      <td>nordeste</td>
      <td>-0.0515<sup>*</sup></td>
      <td>(0.009)</td>
    </tr>
    <tr>
      <td colspan="3"></td>
    </tr>
    <tr>
      <td>N</td><td colspan="2">4685</td>
    </tr>
    <tr>
      <td>R<sup>2</sup></td><td colspan="2">0.941</td>
    </tr>
    <tr>
      <td>Adj. R<sup>2</sup></td><td colspan="2">0.940</td>
    </tr>
    <tr>
      <td>AIC</td><td colspan="2">1340</td>
    </tr>
    <tr>
      <td>BIC</td><td colspan="2">1379</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">* p ≤ 0.05. Erros-padrão robustos (HC1).</td>
    </tr>
  </tfoot>
</table>


### Modelo 02

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2\text{Emprego} + \beta_3 log(\text{Seg}) + \beta_4\text{Evasão-EM} + \beta_5\text{Nordeste} + u_i$$


                                      Modelo 02                                   
    ==============================================================================
    Dep. Variable:             log_obitos   R-squared:                       0.941
    Model:                            OLS   Adj. R-squared:                  0.941
    Method:                 Least Squares   F-statistic:                 1.540e+04
    Date:                Mon, 16 Sep 2024   Prob (F-statistic):               0.00
    Time:                        10:00:44   Log-Likelihood:                -646.96
    No. Observations:                4685   AIC:                             1306.
    Df Residuals:                    4679   BIC:                             1345.
    Df Model:                           5                                         
    Covariance Type:                  HC1                                         
    =======================================================================================
                              coef    std err          z      P>|z|      [0.025      0.975]
    ---------------------------------------------------------------------------------------
    const                  -4.4103      0.037   -119.224      0.000      -4.483      -4.338
    log_populacao           0.9399      0.004    243.810      0.000       0.932       0.947
    tempo_medio_emprego     0.0011      0.000      4.362      0.000       0.001       0.002
    log_seguranca           0.0039      0.001      5.815      0.000       0.003       0.005
    taxa_abandono_em       -0.0138      0.001    -12.507      0.000      -0.016      -0.012
    nordeste               -0.0321      0.010     -3.362      0.001      -0.051      -0.013
    ==============================================================================
    Omnibus:                      560.032   Durbin-Watson:                   1.513
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):             1051.128
    Skew:                          -0.777   Prob(JB):                    5.63e-229
    Kurtosis:                       4.724   Cond. No.                         218.
    ==============================================================================
    
    Notes:
    [1] Standard Errors are heteroscedasticity robust (HC1)


### Modelo 03

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_{i, i = \{2, 3, 4\} } log(\text{Despesas}) + \beta_5\text{(Alu/Turma)} + \beta_6\text{Evasão-EM} + \beta_7\text{Nordeste} + u_i$$



                                      Modelo 03                                   
    ==============================================================================
    Dep. Variable:             log_obitos   R-squared:                       0.942
    Model:                            OLS   Adj. R-squared:                  0.942
    Method:                 Least Squares   F-statistic:                 1.036e+04
    Date:                Mon, 16 Sep 2024   Prob (F-statistic):               0.00
    Time:                        10:00:47   Log-Likelihood:                -609.33
    No. Observations:                4685   AIC:                             1237.
    Df Residuals:                    4676   BIC:                             1295.
    Df Model:                           8                                         
    Covariance Type:                  HC1                                         
    =======================================================================================
                              coef    std err          z      P>|z|      [0.025      0.975]
    ---------------------------------------------------------------------------------------
    const                  -4.5053      0.055    -81.557      0.000      -4.614      -4.397
    log_populacao           0.9269      0.006    165.187      0.000       0.916       0.938
    tempo_medio_emprego     0.0010      0.000      4.305      0.000       0.001       0.002
    log_seguranca           0.0037      0.001      5.574      0.000       0.002       0.005
    log_assistencia         0.0144      0.005      3.006      0.003       0.005       0.024
    log_previdencia         0.0041      0.001      7.978      0.000       0.003       0.005
    atu_em                 -0.0023      0.001     -2.629      0.009      -0.004      -0.001
    taxa_abandono_em       -0.0126      0.001    -11.548      0.000      -0.015      -0.010
    nordeste               -0.0049      0.010     -0.475      0.635      -0.025       0.015
    ==============================================================================
    Omnibus:                      568.175   Durbin-Watson:                   1.543
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):             1058.242
    Skew:                          -0.789   Prob(JB):                    1.61e-230
    Kurtosis:                       4.712   Cond. No.                         608.
    ==============================================================================
    
    Notes:
    [1] Standard Errors are heteroscedasticity robust (HC1)



    
    ====================================================
                        Modelo 01  Modelo 02  Modelo 03 
    ----------------------------------------------------
    const               -4.5198*** -4.4103*** -4.5053***
                        (0.0849)   (0.0370)   (0.0552)  
    nordeste            -0.0515*** -0.0321*** -0.0049   
                        (0.0086)   (0.0095)   (0.0102)  
    log_populacao       0.9482***  0.9399***  0.9269*** 
                        (0.0035)   (0.0039)   (0.0056)  
    taxa_abandono_em    -0.0143*** -0.0138*** -0.0126***
                        (0.0011)   (0.0011)   (0.0011)  
    tempo_medio_emprego 0.0010***  0.0011***  0.0010*** 
                        (0.0002)   (0.0002)   (0.0002)  
    log_seguranca                  0.0039***  0.0037*** 
                                   (0.0007)   (0.0007)  
    log_assistencia                           0.0144*** 
                                              (0.0048)  
    log_previdencia                           0.0041*** 
                                              (0.0005)  
    log_despesa         0.0032                          
                        (0.0040)                        
    atu_em                                    -0.0023***
                                              (0.0009)  
    R-squared           0.9405     0.9409     0.9419    
    R-squared Adj.      0.9405     0.9409     0.9418    
    Covariance type:    HC1        HC1        HC1       
    N                   4685.0000  4685.0000  4685.0000 
    Prob(F-statistic):  0.0000     0.0000     0.0000    
    Prob(JB):           0.0000     0.0000     0.0000    
    ====================================================
    Standard errors in parentheses.
    * p<.1, ** p<.05, ***p<.01


Começando pelo termo de erro, o valor-p do teste de Jarque-Bera indica sucesso ao rejeitar a hipótese nula de que os erros dos modelos seguem uma distribuição normal. Apesar disso, seguiremos com a interpretação geral dos modelos e com o teste de hipóteses.

Os coeficientes reportados para as variáveis "``log(Pop)``" e "``Emprego``" confirmam as nossas suposições feitas *a priori*, indicando que um aumento de 1% na população de uma cidade está associado a um aumento de cerca de 0,9% no número de mortes e que o aumento no tempo médio que um trabalhador fica empregado está associado a uma diminuição de, aproximadamente, 0,1% no número de óbitos. Ambos os resultados são estatisticamente significantes ao nível de 5% em todos os modelos. 

Apesar dos resultados consoantes com a intuição para as variáveis acima, as variáveis "``Evasão-EM``", "``Aluno/Turma-EM``" apresentam um sinal discordante das suposições feitas *a priori*. Para a variável de "``Evasão-EM``", os resultados obtidos reportam que um aumento na taxa de abandono do ensino médio *diminui* a o número de óbitos de um município em cerca de 1,3%, sendo esse resultado estatisticamente significante ao nível de 5%. Analogamente, o coeficiente da variável "``Aluno/Turma-EM``" no terceiro modelo indica que um aumento na média de alunos por turma em uma cidade diminui o número de óbitos em 0,23% e esse resultado também é estatisticamente significante ao nível de 5%. Inicialmente, essa contradição nos coeficientes das variáveis educacionais pode indicar a necessidade de se utilizar um controle para o perfil de renda do município. Isto é, em municípios muito pobres, um par de braço a mais no trabalho - e portanto fora da escola - pode significar um aumento da qualidade de vida e, consequentemente, um aumento na expectativa de vida.

Além dos indicadores educacionais acima, as variáveis orçamentárias "``log(Despesa)``" e "``log(Despesas)``" também contradizem as suposições feitas *a priori*. No primeiro modelo, a variável "``log(Despesa)``" apresentou um sinal positivo, indicando que um aumento de 1% no gasto público total está associado, na média, a um aumento de 0,0032% no número de óbitos, entretanto, esse resultado não é estatisticamente diferente de zero. Os resultados dos dois últimos modelos indicam que um aumento no gasto público em segurança está associado, *ceteris paribus*, a um aumento de aproximadamente 0,0038% no número de óbitos. Semelhantemente, no terceiro modelo, valores de 0,0144% e 0,0041% são reportados para a assistência social e para a previdência. Esses resultados são estatísticamente significantes ao nível de 5%.

A discordância entre as susposições iniciais e os resultados nas variáveis de gasto público apresentam algumas limitações dos modelos estimados. Uma das justificas para os sinais encontrados é a ausência de um controle por perfil etário do município. Intuitivamente, municípios que se encontram na parte superior da pirâmide etária apresentam um gasto com previdência maior sem que isso produza um efeito sob o número de óbitos.

Adicionalmente, a relação entre o número de óbitos e o município estar situado no nordeste, apontada na etapa de descrição dos dados, é significativa para os dois primeiros modelos, mas não da forma que a distribuição dos dados permite inferir. Como indicado na tabela, municípios localizados no nordeste do país possuem um número de óbitos entre 3,2% e 5,15% menor. Para o terceiro modelo, o coeficiente da *dummy* "``Nordeste``" não é estatisticamente diferente de zero.

Por fim, dois comentários: (i) o valor-p das estatísticas F de todos os modelos permite rejeitar a hipótese nula de que as variáveis explicativas, de forma conjunta, são iguais a zero; e (ii) a matriz de variância-covariância utilizada é robusta (HC1)./


[^1]: [github.com/baldoinov](https://github.com/baldoinov/econometria-i).