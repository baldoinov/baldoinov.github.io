---
layout: post
title: What is the impact of public spending on the number of deaths in Brazilian cities?
description: Análise do impacto do gasto público no número de mortes dos municípios brasileiros.
---



```python
import pandas as pd
import numpy as np
import statsmodels.api as sm
import matplotlib.pyplot as plt
import seaborn as sns

# sns.set_palette(sns.dark_palette("#2EA3C5", reverse=True, n_colors=20))
plt.style.use(["seaborn-v0_8-paper"])
pd.set_option("display.max_columns", 500)
```


```python
df = pd.read_csv(
    "data/processed/dataset-qual-o-impacto-do-gasto-publico-no-nro-de-mortes.csv"
)
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ano</th>
      <th>sigla_uf</th>
      <th>id_municipio</th>
      <th>numero_obitos</th>
      <th>tempo_medio_emprego</th>
      <th>qtd_pessoas_cidade_uf</th>
      <th>qtd_brancos_cidade_uf</th>
      <th>qtd_negros_cidade_uf</th>
      <th>qtd_indigena_cidade_uf</th>
      <th>qtd_amarelos_cidade_uf</th>
      <th>quantidade_estabelecimentos_ensino_infantil</th>
      <th>quantidade_estabelecimentos_ensino_fundamental</th>
      <th>quantidade_estabelecimentos_ensino_medio</th>
      <th>seguranca</th>
      <th>assistencia</th>
      <th>previdencia</th>
      <th>despesa_total</th>
      <th>taxa_abandono_ef</th>
      <th>taxa_reprovacao_ef</th>
      <th>taxa_aprovacao_ef</th>
      <th>taxa_abandono_em</th>
      <th>taxa_reprovacao_em</th>
      <th>taxa_aprovacao_em</th>
      <th>atu_ei</th>
      <th>atu_ef</th>
      <th>atu_em</th>
      <th>populacao</th>
      <th>log_populacao</th>
      <th>log_obitos</th>
      <th>log_despesa</th>
      <th>log_seguranca</th>
      <th>log_assistencia</th>
      <th>log_previdencia</th>
      <th>obitos_pc</th>
      <th>despesa_pc</th>
      <th>seguranca_pc</th>
      <th>assistencia_pc</th>
      <th>previdencia_pc</th>
      <th>maioria_nao_branca_cidade_uf</th>
      <th>regiao</th>
      <th>norte</th>
      <th>nordeste</th>
      <th>sudeste</th>
      <th>sul</th>
      <th>centro</th>
      <th>pop_quantile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2019</td>
      <td>AC</td>
      <td>1200013</td>
      <td>48</td>
      <td>10.771429</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.00</td>
      <td>6253910.00</td>
      <td>0.0</td>
      <td>2.724452e+08</td>
      <td>1.491667</td>
      <td>3.441667</td>
      <td>95.066667</td>
      <td>13.233333</td>
      <td>14.033333</td>
      <td>72.733333</td>
      <td>14.066667</td>
      <td>26.658333</td>
      <td>27.733333</td>
      <td>15256.0</td>
      <td>9.632728</td>
      <td>3.891820</td>
      <td>19.422948</td>
      <td>0.000000</td>
      <td>15.648718</td>
      <td>0.000000</td>
      <td>0.003146</td>
      <td>17858.230874</td>
      <td>0.000000</td>
      <td>409.931175</td>
      <td>0.000000</td>
      <td>0</td>
      <td>Norte</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>C</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2019</td>
      <td>AC</td>
      <td>1200054</td>
      <td>41</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.00</td>
      <td>7852964.62</td>
      <td>0.0</td>
      <td>2.099017e+08</td>
      <td>4.825000</td>
      <td>7.825000</td>
      <td>87.350000</td>
      <td>6.333333</td>
      <td>6.800000</td>
      <td>86.866667</td>
      <td>13.172727</td>
      <td>18.491667</td>
      <td>23.633333</td>
      <td>7417.0</td>
      <td>8.911530</td>
      <td>3.737670</td>
      <td>19.162150</td>
      <td>0.000000</td>
      <td>15.876402</td>
      <td>0.000000</td>
      <td>0.005528</td>
      <td>28300.087438</td>
      <td>0.000000</td>
      <td>1058.779105</td>
      <td>0.000000</td>
      <td>0</td>
      <td>Norte</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>B</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2019</td>
      <td>AC</td>
      <td>1200104</td>
      <td>148</td>
      <td>4.959184</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.00</td>
      <td>12911431.04</td>
      <td>871082.1</td>
      <td>5.789614e+08</td>
      <td>1.266667</td>
      <td>2.583333</td>
      <td>96.150000</td>
      <td>3.566667</td>
      <td>2.466667</td>
      <td>93.966667</td>
      <td>19.600000</td>
      <td>24.158333</td>
      <td>30.533333</td>
      <td>26278.0</td>
      <td>10.176487</td>
      <td>5.003946</td>
      <td>20.176746</td>
      <td>0.000000</td>
      <td>16.373624</td>
      <td>13.677493</td>
      <td>0.005632</td>
      <td>22032.170992</td>
      <td>0.000000</td>
      <td>491.339944</td>
      <td>33.148721</td>
      <td>0</td>
      <td>Norte</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>D</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2019</td>
      <td>AC</td>
      <td>1200138</td>
      <td>42</td>
      <td>5.550000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4.233333</td>
      <td>2.375000</td>
      <td>93.391667</td>
      <td>5.766667</td>
      <td>4.066667</td>
      <td>90.166667</td>
      <td>18.166667</td>
      <td>20.725000</td>
      <td>19.133333</td>
      <td>10266.0</td>
      <td>9.236593</td>
      <td>3.761200</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0.004091</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>0</td>
      <td>Norte</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>B</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2019</td>
      <td>AC</td>
      <td>1200179</td>
      <td>46</td>
      <td>5.250000</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>1340412.96</td>
      <td>6125244.78</td>
      <td>0.0</td>
      <td>2.398449e+08</td>
      <td>3.825000</td>
      <td>9.000000</td>
      <td>87.175000</td>
      <td>10.066667</td>
      <td>4.300000</td>
      <td>85.633333</td>
      <td>18.233333</td>
      <td>24.033333</td>
      <td>24.566667</td>
      <td>11733.0</td>
      <td>9.370161</td>
      <td>3.850148</td>
      <td>19.295503</td>
      <td>14.108489</td>
      <td>15.627929</td>
      <td>0.000000</td>
      <td>0.003921</td>
      <td>20441.908374</td>
      <td>114.242986</td>
      <td>522.052738</td>
      <td>0.000000</td>
      <td>0</td>
      <td>Norte</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>C</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 5570 entries, 0 to 5569
    Data columns (total 46 columns):
     #   Column                                          Non-Null Count  Dtype  
    ---  ------                                          --------------  -----  
     0   ano                                             5570 non-null   int64  
     1   sigla_uf                                        5570 non-null   object 
     2   id_municipio                                    5570 non-null   int64  
     3   numero_obitos                                   5570 non-null   int64  
     4   tempo_medio_emprego                             4719 non-null   float64
     5   qtd_pessoas_cidade_uf                           4290 non-null   float64
     6   qtd_brancos_cidade_uf                           4290 non-null   float64
     7   qtd_negros_cidade_uf                            4290 non-null   float64
     8   qtd_indigena_cidade_uf                          4290 non-null   float64
     9   qtd_amarelos_cidade_uf                          4290 non-null   float64
     10  quantidade_estabelecimentos_ensino_infantil     4290 non-null   float64
     11  quantidade_estabelecimentos_ensino_fundamental  4290 non-null   float64
     12  quantidade_estabelecimentos_ensino_medio        4290 non-null   float64
     13  seguranca                                       5537 non-null   float64
     14  assistencia                                     5537 non-null   float64
     15  previdencia                                     5537 non-null   float64
     16  despesa_total                                   5537 non-null   float64
     17  taxa_abandono_ef                                5570 non-null   float64
     18  taxa_reprovacao_ef                              5570 non-null   float64
     19  taxa_aprovacao_ef                               5570 non-null   float64
     20  taxa_abandono_em                                5561 non-null   float64
     21  taxa_reprovacao_em                              5561 non-null   float64
     22  taxa_aprovacao_em                               5561 non-null   float64
     23  atu_ei                                          5570 non-null   float64
     24  atu_ef                                          5570 non-null   float64
     25  atu_em                                          5561 non-null   float64
     26  populacao                                       5570 non-null   float64
     27  log_populacao                                   5570 non-null   float64
     28  log_obitos                                      5570 non-null   float64
     29  log_despesa                                     5537 non-null   float64
     30  log_seguranca                                   5537 non-null   float64
     31  log_assistencia                                 5537 non-null   float64
     32  log_previdencia                                 5537 non-null   float64
     33  obitos_pc                                       5570 non-null   float64
     34  despesa_pc                                      5537 non-null   float64
     35  seguranca_pc                                    5537 non-null   float64
     36  assistencia_pc                                  5537 non-null   float64
     37  previdencia_pc                                  5537 non-null   float64
     38  maioria_nao_branca_cidade_uf                    5570 non-null   int64  
     39  regiao                                          5570 non-null   object 
     40  norte                                           5570 non-null   int64  
     41  nordeste                                        5570 non-null   int64  
     42  sudeste                                         5570 non-null   int64  
     43  sul                                             5570 non-null   int64  
     44  centro                                          5570 non-null   int64  
     45  pop_quantile                                    5570 non-null   object 
    dtypes: float64(34), int64(9), object(3)
    memory usage: 2.0+ MB


Este trabalho visa entender como algumas variáveis econômicas impactam o número de óbitos de cidades brasileiras. Para tal, é utilizada uma *cross-section* de municípios que contém a variável explicada, o número de óbitos, e possíveis variáveis explicativas, como as despesas orçamentárias do município, população total, região geográfica e indicadores educacionais. Esse trabalho foi inspirado pelo artigo [*US mortality by economic, demographic, and social characteristics: the National Longitudinal Mortality Study*](https://ajph.aphapublications.org/doi/epdf/10.2105/AJPH.85.7.949) de Sorlie, Backlund e Keller, publicado no *American Journal of Public Health* em 1995.

## Descrição dos Dados

***

A base utilizada neste trabalho é de elaboração própria, as bases brutas usadas para aquisição dos dados podem ser obtidas através do portal [*Base dos Dados*](https://basedosdados.org/) (a lista completa das bases utilizadas se encontra nas referências). Adicionalmente, os *scripts* utilizados para o tratamento, agregação e modelagem dos dados podem ser encontrados em [Perfil de Vitor Baldoino - *GitHub*](https://github.com/baldoinov/econometria-i).


```python
fig, axes = plt.subplots(1, 2, figsize=(20, 5))

# sns.histplot(x='populacao', data=df, hue='regiao', ax=axes[0])
sns.barplot(x='regiao', y='populacao', estimator=np.mean, data=df, ax=axes[0])
axes[0].set_title('Média populacional dos municípios por região')

sns.barplot(x='regiao', y='numero_obitos', estimator=np.mean, data=df, ax=axes[1])
axes[1].set_title('Média de óbitos dos muncípios por região')


plt.show()
```


    
![png](qual-o-impacto-do-gasto-publico-no-nro-de-mortes_files/qual-o-impacto-do-gasto-publico-no-nro-de-mortes_6_0.png)
    



```python
pairs = df[['numero_obitos', 'despesa_total', 'taxa_abandono_em', 'taxa_abandono_ef', 'atu_em', 'atu_ef', 'populacao', 'regiao']]
sns.pairplot(pairs, hue='regiao', corner=True)
plt.show()
```


    
![png](qual-o-impacto-do-gasto-publico-no-nro-de-mortes_files/qual-o-impacto-do-gasto-publico-no-nro-de-mortes_7_0.png)
    



```python
sns.jointplot(data=df, x="log_obitos", y="log_seguranca", hue='regiao')

plt.show()
```


    
![png](qual-o-impacto-do-gasto-publico-no-nro-de-mortes_files/qual-o-impacto-do-gasto-publico-no-nro-de-mortes_8_0.png)
    



```python
sns.jointplot(data=df, x="log_obitos", y="log_populacao", hue='regiao')

plt.show()
```


    
![png](qual-o-impacto-do-gasto-publico-no-nro-de-mortes_files/qual-o-impacto-do-gasto-publico-no-nro-de-mortes_9_0.png)
    


Como apresentado no gráfico da esquerda, os municípios de todas as regiões apresentam uma associação positiva entre o *log* do número de óbitos e o *log* da despesa total em segurança, isto é contra-intuitivo, visto que se espera que o gráfico apresente relação negativa. Essa contradição será melhor explorada nos modelos de regressão.

No gráfico da direita, está a associação entre os *logs* do número de óbitos e da população. Um fato interessante no gráfico de distribuição superior é que o *log* do número de óbitos da região nordeste, comparado às outras regiões, concentra-se em um nível ligeiramente maior e possui menor variância.

## Modelos de Regressão

***

A abordagem para estimar o impacto de variáveis econômicas no número de óbitos de um município consiste em estimar três modelos:

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_3 log(\text{Despesa}) + \beta_4 \text{Evasão-EM} + \beta_5 \text{Nordeste} + u_i$$

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2\text{Emprego} + \beta_3 log(\text{Seg}) + \beta_4\text{Evasão-EM} + \beta_5\text{Nordeste} + u_i$$

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_{i, i = \{3, 4, 5\} } log(\text{Despesas}) + \beta_{i, i = \{6, 7\} } \text{Educação} + \beta_8\text{Nordeste} + u_i$$

Nestes modelos, as variáveis "``log(Pop)``", "``Emprego``", "``Evasão-EM``" representam o *log* da população, o tempo médio que um trabalhador permance empregado e a taxa de evasão do ensino médio de cada município, respectivamente. A variável "``Nordeste``" é uma *dummy* que assume o valor 1 se a cidade observada é na região nordeste do país e 0 caso contrário. Espera-se que as variáveis "``log(Pop)``" e "``Evasão-EM``" possuam um sinal positivo, a primeira porque é natural que municípios maiores apresentem um maior número de óbitos e a última para refletir a intuição de que uma maior evasão escolar está relacionada à um baixo nível de instrução e, consequentemente, a uma qualidade de vida menor e expectativa de vida mais curta. O sinal esperado da variável "``Emprego``" é positivo, relefetindo a ideia de que uma permanência maior em um emprego, na média, tende a aumentar a qualidade de vida de um trabalhador e, portanto, diminuir as chances de óbito.

No primeiro e segundo modelo, as variáveis "``log(Despesa)``" e "``log(Seg)``" são o *log* da despesa orçamentária total do município e o *log* do gasto em segurança público do município, respectivamente. No terceiro modelo, a variável representada como "``log(Despesas)``" contém o *log* da despesa orçamentária do município com segurança, assistência social e previdência. Esses gastos foram isolados e representados separadamente por se pensar que eles sejam mais importante para explicar o número de óbitos da cidade. Adicionalmente, espera-se que o sinal das variáveis de despesas orçamentárias seja negativo em todos os modelos, intuitivamente, esse sinal captaria a ideia que um gasto público maior tem a capacidade de aumentar o bem-estar geral e diminuir o número de óbitos do município.

No terceiro e último modelo, o componente "``Educação``" e seus subscritos indicam a variável "``Evasão-EM``", presente nos modelos anteriores, e a variável "``Aluno/Turma-EM``", que é a média de alunos por turma para aquele município. Essas variáveis foram condensadas no componente "``Educação``" para poupar espaço. Assim como nos outros modelos que possuem indicadores relacionados à educação, o sinal esperado dessas variáveis é positivo, transmitindo a ideia de que a piora nos indicadores educacionais aumente o número de óbitos.

### Modelo 01

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2 \text{Emprego} + \beta_3 log(\text{Despesa}) + \beta_4 \text{Evasão-EM} + \beta_5 \text{Nordeste} + u_i$$


```python
df1 = df[['log_obitos', 'log_populacao', 'tempo_medio_emprego', 'log_despesa', 'taxa_abandono_em', 'nordeste']].dropna()

X = df1[['log_populacao', 'tempo_medio_emprego', 'log_despesa', 'taxa_abandono_em', 'nordeste']]
X = sm.add_constant(X)

Y = df1['log_obitos']

model1 = sm.OLS(Y, X, missing='drop')
results1 = model1.fit(cov_type='HC1')

summ1 = results1.summary(title='Modelo 01')

summ1_slim = results1.summary(title='Modelo 01', slim=True)

print(summ1)
```

                                      Modelo 01                                   
    ==============================================================================
    Dep. Variable:             log_obitos   R-squared:                       0.941
    Model:                            OLS   Adj. R-squared:                  0.940
    Method:                 Least Squares   F-statistic:                 1.534e+04
    Date:                Mon, 16 Sep 2024   Prob (F-statistic):               0.00
    Time:                        10:00:41   Log-Likelihood:                -663.95
    No. Observations:                4685   AIC:                             1340.
    Df Residuals:                    4679   BIC:                             1379.
    Df Model:                           5                                         
    Covariance Type:                  HC1                                         
    =======================================================================================
                              coef    std err          z      P>|z|      [0.025      0.975]
    ---------------------------------------------------------------------------------------
    const                  -4.5198      0.085    -53.250      0.000      -4.686      -4.353
    log_populacao           0.9482      0.004    270.681      0.000       0.941       0.955
    tempo_medio_emprego     0.0010      0.000      4.257      0.000       0.001       0.001
    log_despesa             0.0032      0.004      0.815      0.415      -0.005       0.011
    taxa_abandono_em       -0.0143      0.001    -12.724      0.000      -0.016      -0.012
    nordeste               -0.0515      0.009     -5.991      0.000      -0.068      -0.035
    ==============================================================================
    Omnibus:                      581.550   Durbin-Watson:                   1.497
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):             1105.921
    Skew:                          -0.797   Prob(JB):                    7.12e-241
    Kurtosis:                       4.768   Cond. No.                         576.
    ==============================================================================
    
    Notes:
    [1] Standard Errors are heteroscedasticity robust (HC1)


### Modelo 02

$$log(\text{mortes}) = \beta_0 + \beta_1 log(\text{Pop}) + \beta_2\text{Emprego} + \beta_3 log(\text{Seg}) + \beta_4\text{Evasão-EM} + \beta_5\text{Nordeste} + u_i$$


```python
df2 = df[['log_obitos', 'log_populacao', 'tempo_medio_emprego', 'log_seguranca', 'taxa_abandono_em', 'nordeste']].dropna()

X = df2[['log_populacao', 'tempo_medio_emprego', 'log_seguranca', 'taxa_abandono_em', 'nordeste']]
X = sm.add_constant(X)

Y = df2['log_obitos']

model2 = sm.OLS(Y, X, missing='drop')
results2 = model2.fit(cov_type='HC1')

summ2 = results2.summary(title='Modelo 02')

summ2_slim = results2.summary(title='Modelo 02', slim=True)

print(summ2)
```

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


```python
df3 = df[['log_obitos', 'log_populacao', 'tempo_medio_emprego', 'log_seguranca', 'log_assistencia', 'log_previdencia', 'atu_em', 'taxa_abandono_em', 'nordeste']].dropna()

X = df3[['log_populacao', 'tempo_medio_emprego', 'log_seguranca', 'log_assistencia', 'log_previdencia', 'atu_em', 'taxa_abandono_em', 'nordeste']]
X = sm.add_constant(X)

Y = df3['log_obitos']

model3 = sm.OLS(Y, X, missing='drop')
results3 = model3.fit(cov_type='HC1')

summ3 = results3.summary(title='Modelo 03')

summ3_slim = results3.summary(title='Modelo 03', slim=True)

print(summ3)
```

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



```python
from statsmodels.iolib.summary2 import summary_col
from statsmodels.stats.stattools import jarque_bera
#from statsmodels.stats.diagnostic import het_breuschpagan

summs = summary_col(results=[results1, results2, results3], stars=True,
                    model_names=['Modelo 01', 'Modelo 02', 'Modelo 03'],
                    regressor_order=['const', 'nordeste', 'log_populacao', 'taxa_abandono_em', 'tempo_medio_emprego', 'log_seguranca', 'log_assistencia', 'log_previdencia', 'log_despesa'],
                    info_dict={"N": lambda x: (x.nobs), 
                               "Prob(F-statistic):": lambda x: (x.f_pvalue),
                               "Prob(JB):": lambda x: (jarque_bera(x.resid)[1]),
                               "Covariance type:": lambda x: (x.cov_type)})

print(summs)
```

    
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

## Referências

Sorlie, P. D., Backlund, E., & Keller, J. B. (1995). US mortality by economic, demographic, and social characteristics: the National Longitudinal Mortality Study. American Journal of Public Health, 85(7), 949-956.

Base dos Dados. Sistema de Informações sobre Mortalidade (SIM). Disponível em: <https://basedosdados.org/dataset/br-ms-sim?bdm_table=microdados>. Acesso em: 14 de jul. de 2022.

Base dos Dados. Cadastro Geral de Empregados e Desempregados (CAGED). Disponível em: <https://basedosdados.org/dataset/br-me-caged?bdm_table=microdados_antigos>. Acesso em: 14 de jul. de 2022.

Base dos Dados. Projeto Acesso a Oportunidades. Disponível em: <https://basedosdados.org/dataset/br-ipea-acesso-oportunidades?bdm_table=estatisticas_2019>. Acesso em: 14 de jul. de 2022.

Base dos Dados. Sistema de Informações Contábeis e Fiscais do Setor Público Brasileiro (Siconfi). Disponível em: <https://basedosdados.org/dataset/br-me-siconfi?bdm_table=municipio_despesas_orcamentarias>. Acesso em: 14 de jul. de 2022.

Base dos Dados. Indicadores Educacionais. Disponível em: <https://basedosdados.org/dataset/br-inep-indicadores-educacionais?bdm_table=escola>. Acesso em: 14 de jul. de 2022.

Base dos Dados. População Brasileira. Disponível em: <https://basedosdados.org/dataset/br-ibge-populacao?bdm_table=municipio>. Acesso em: 14 de jul. de 2022.

