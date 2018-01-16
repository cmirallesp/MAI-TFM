## intent:MODEL_METHOD_TEST
- add a model´s method
- describe a model´s method
- I want to describe a method of a model
- I want to add [m2](method_name) to [model1](model_name)
- I want to add the method [m2](method_name) to [model1](model_name)
- I want to describe the method [m-2](method_name) to [model1](model_name)
- I want to describe [getname](method_name) to a model
- I want to describe a method for [user](model_name) model
- I want to describe a method [getname](method_name) for [user](model_name) entity
- I want to add a method [getname](method_name) for [user](model_name) entity
- I want to add the method [people-in-project](method_name) to [projects](model_name)
- I want to add a method [people-in-project](method_name) to [project](model_name)
- I want to add a method [sum](method_name) to [calculator](model_name)
- I want to add a method [subtract](method_name) to [turing_machine](model_name)

- Given an [user](model_name) [When](when) the method [get-extension](method_name) with parameter ['(034) 666 636 616'](par_value) is called [Then](then) should [return](op) ['034'](expected_value)
- Given an [user](model_name) [When](when) the method [get-extension](method_name) with parameter ['(001) 666 636 616'](par_value) is called [Then](then) it should [return](op) ['001'](expected_value)

- Given an [user](model_name) [When](when) the method [getname](method_name) is called with parameters ['Daniel'](par_value) and ['Mur'](par_value) [Then](then)  should [return](op) ['Daniel Mur'](expected_value)
- Given an [user](model_name) [When](when) the method [getname](method_name) is called with ['daniel'](par_value) and ['mur'](par_value) [Then](then)  should [return](op) ['daniel mur'](expected_value)
- Given an [user](model_name) [When](when) I call [getname](method_name) with ['Daniel'](par_value) and ['Mur'](par_value) [Then](then)  should [return](op) ['Daniel Mur'](expected_value)
- Given an [user](model_name) [When](when) I call the method [getname](method_name) with ['Daniel'](par_value) and ['Mur'](par_value) [Then](then)  should [return](op) ['Daniel Mur'](expected_value)
- Given an [user](model_name) [When](when) [getname](method_name) is called with ['Daniel'](par_value) and ['Mur'](par_value) [Then](then) ['Daniel Mur'](expected_value) is expected
- Given a [list](model_name) [When](when) I call [add](method_name) with parameters [5](par_value) and [7](par_value) [Then](then) should [return](op) ['5,7'](expected_value)
- Given a [list](model_name) [When](when) I call the method [add](method_name) with parameters [5](par_value) and [7](par_value) [Then](then) should [return](op) ['5,7'](expected_value)
- Given a [list](model_name) [When](when) the method [add](method_name) is called with params ['a'](par_value) and ['b'](par_value) [Then](then) should [return](op) ['a,b'](expected_value)
- Given a [project](model_name) [When](when) I call [add-priority](method_name) with params ['1'](par_value) and ['5'](par_value) [Then](then) should [return](op) ['5'](expected_value)
- Given a [calculator](model_name) [When](when) the method [sum](method_name) with parameters [3](par_value) and [2](par_value) [Then](then) is should [return](op) [5](expected_value)
- Given a [calculator](model_name) [When](when) I call the method [sum](method_name) with [3](par_value) and [4](par_value) as parameters [Then](then) should [return](op) [7](expected_value)
- Given a [calculator](model_name) [When](when) the method [subtract](method_name) with parameters [10](par_value) and [5](par_value) [Then](then) should [be](op) [5](expected_value)
- Given a [calculator](model_name) [When](when) I call [subtract](method_name) with [10](par_value) and [5](par_value) [Then](then) should return [5](expected_value)
- Given a [calculator](model_name) [When](when) I call [subtract](method_name) with [10](par_value) and [5](par_value) [Then](then) I expect [5](expected_value)

- Given a [project](model_name) [When](when) I call [add-tasks](method_name) with ['t1'](par_value), ['t2'](par_value), ['t3'](par_value) [Then](then) I expect ['t1,t2,t3'](expected_value)
- Given a [project](model_name) [When](when) I call [add-tasks](method_name) with ['t1'](par_value),['t2'](par_value),['t3'](par_value) [Then](then) I expect ['t1,t2,t3'](expected_value)
- Given a [string](model_name) [When](when) the method [concat](method_name) is called with parameters ['tt'](par_value), ['aa'](par_value), ['zz'](par_value) [Then](then) should [return](op) ['tt,aa,zz'](expected_value)
- Given a [string](model_name) [When](when) the method [concat](method_name) is called with parameters ['tt'](par_value), ['aa'](par_value) and ['zz'](par_value) [Then](then) should [return](op) ['tt,aa,zz'](expected_value)
- Given a [string](model_name) [When](when) I call the method [concat](method_name) with ['a'](par_value),['aa'](par_value),['jj'](par_value) [Then](then) should [return](op) ['a,aa,jj'](expected_value)
- Given an [user](model_name) [When](when) the method [fullname](method_name) is called with parameters ['david'](par_value),['mor'](par_value) and ['mor'](par_value) [Then](then)  I expect ['david mor mor'](expected_value)
- Given an [user](model_name) [When](when) I call the method [fullname](method_name) with parameters ['pol'](par_value), ['jil'](par_value), ['mir'](par_value) [Then](then) should [return](op) ['pol jil mir'](expected_value) for
- Given a [calculator](model_name) [When](when) I call a method [sum](method_name) that receives [1](par_value), [2](par_value) and [3](par_value) parameters [Then](then) should [return](op) [ten](expected_value)

- Given a [calculator](model_name) [When](when) I call a method [sum](method_name) that receives [1](par_value), [2](par_value), [3](par_value) and [3](par_value) parameters [Then](then) should [return](op) [ten](expected_value)
# synonym:first-name
- first name
- first_name
- firstname
## synonym:last-name
- last name
- last_name
- lastname

## intent:MODEL_VALIDATION
- add a validation
- describe a validation
- I want to describe a validation
- I would like to add a [user](model_name) validation
- I want to describe a validation for [user](model_name) model
- I want to describe a validation for [person](model_name) model
- I want to describe a validation for [Address](model_name) model
- I want to add a validation for [Address](model_name) model
- I want to add a validation for [bank-account](model_name) model
- I want to add a validation for [tag](model_name) model
- validation for [houses](model_name)
- describe a validation for [projects](model_name) model

- Given a [project](model_name) [When](when) is [created](method) with attributes [name](att_name): ['p1'](att_value), [num-of-tasks](att_name): [2](att_value)   [Then](then) should [be](op) [valid](method_name)
- Given a [bank-account](model_name) [When](when) is [created](method) with [holder](att_name): ['Anna'](att_value) and [expiration date](att_name): ['20/10/2020'](att_value) [Then](then) I expect to [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) [initialize](method) with [color](att_name) and [speed](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) [initialize](method) with [color](att_name):['red'](att_value) and [speed](att_name): ['200kmh'](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) I [initialize](method) with [area](att_name): 100  and [rooms](att_name):2 [Then](then) should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) I [initialize](method) with [area](att_name) and [rooms](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [world cities](model_name) [When](when) is [created](method) with [area](att_name) and [name](att_name) then should [be](op) [valid](method_name)
- Given a [person](model_name) [When](when) is [initialized](method) with [name](att_name): ['David'](att_value) and [last-name](att_name): ['Mur'](att_value) [Then](then) I expect to [be](op) [valid](method_name)

- Given a [project](model_name) [When](when) is [created](method) with attributes [name](att_name), [num-of-tasks](att_name) and [num-of-people](att_name) [Then](then) it should [be](op) [valid](method_name)
- Given a [project](model_name) [When](when) I [initialize](method) with [name](att_name): ['p1'](att_value), [num-of-tasks](att_name): [2](att_value) and [num-of-people](att_name): [3](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [bank-account](model_name) [When](when) is [created](method) with [holder](att_name), [expiration date](att_name) and [cvv](att_name) [Then](then) I expect to [be](op) [valid](method_name)
- Given a [bank-account](model_name) [When](when) is [initialized](method) with [holder](att_name): ['Maria'](att_value), [expiration date](att_name): ['10/01/2017'](att_value) and [cvv](att_name): [999](att_value) [Then](then) I expect to [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) is [initialized](method) with [color](att_name): ['red'](att_value), [cvv](att_name): [200](att_value) and [speed](att_name): [300](att_value) [Then](then) it should [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) is [instantiated](method) with [color](att_name), [cvv](att_name) and [speed](att_name) [Then](then) it should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) is [saved](method) with [area](att_name), [rooms](att_name), [washroom](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) is [saved](method) with [area](att_name): [300](att_value), [rooms](att_name): [3](att_value), [washroom](att_name): [2](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [user](model_name) [When](when) I [initialize](method) with [name](att_name): ['David'](att_value), [age](att_name): [20](att_value) and [last-name](att_name): ['CCC'](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [user](model_name) [When](when) I [initialize](method) with [name](att_name), [age](att_name) and [last-name](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [world-cities](model_name) with [area](att_name): [101.4](att_value), [inhabitants](att_name): ['2.5M'](att_value) and [city name](att_name): ['Barcelona'](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [world-cities](model_name) with [area](att_name), [inhabitants](att_name) and [city name](att_name) [Then](then) should [be](op) [valid](method_name)

- Given a [project](model_name) [When](when) I [instantiated](method) with [name](att_name): ['prj1'](att_value), [num-of-tasks](att_name): [3](att_value), [deadline](att_name): ['01/01/2017'](att_value) and [num-of-people](att_name): [5](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [project](model_name) [When](when) is [created](method) with [name](att_name), [num-of-tasks](att_name), [deadline](att_name) and [num-of-people](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [bank-account](model_name) [When](when) is [created](method) with [holder](att_name), [expiration_date](att_name), [balannce](att_name) and [cvv](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [bank-account](model_name) [When](when) is [created](method) with [holder](att_name): ['Anna'](att_value), [expiration_date](att_name): ['10/10/2020'](att_value), [balannce](att_name): [0](att_value) and [cvv](att_name): [999](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) is [initialized](method) with [color](att_name): ['red'](att_value), [cvv](att_name): [200](att_value), [seats](att_name): [5](att_value) and [speed](att_name): [300](att_value) [Then](then) it should [be](op) [valid](method_name)
- Given a [car](model_name) [When](when) is [initialized](method) with [color](att_name), [cvv](att_name), [seats](att_name) and [speed](att_name) [Then](then) it should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) is [saved](method) with [area](att_name), [rooms](att_name), [washroom](att_name) and [terrace](att_name) [Then](then) should [be](op) [valid](method_name)
- Given a [house](model_name) [When](when) is [saved](method) with [area](att_name): [100](att_value), [rooms](att_name): [3](att_value), [washroom](att_name): [1](att_value) and [terrace](att_name): ['N'](att_value) [Then](then) should [be](op) [valid](method_name)
- Given a [person](model_name) [When](when) I [initialize](method) with [name](att_name): ['John'](att_value), [last-name](att_name): ['Mur'](att_value), [age](att_name): [20](att_value) and [height](att_name): [180](att_value) [Then](then) I expect to [be](op) [valid](method_name)
- Given a [person](model_name) [When](when) I [initialize](method) with [name](att_name), [last-name](att_name), [age](att_name) and [height](att_name) [Then](then) I expect to [be](op) [valid](method_name)
- Given a [tag](model_name) [When](when) is [created](method) with [id](att_name), [tag](att_name), [parent](att_name) and [creator](att_name) [Then](then) should be [valid](method_name)
- Given a [tag](model_name) [When](when) is [created](method) with [id](att_name): 1, [tag](att_name): ['history'](att_value), [parent](att_name): ['subject'](att_value) and [creator](att_name): ['David'](att_value) [Then](then) should be [valid](method_name)
- Given a [message](model_name) [When](when) is [initialized](method) with [description](att_name): ['Thanks for reply'](att_value), [sender](att_name): ['Ken'](att_value), [timestamp](att_name): ['01012012'](att_value) and [receiver](att_name): ['Yale'](att_value) [Then](then) should be [valid](method_name)
- Given a [message](model_name) [When](when) is [initialized](method) with [description](att_name), [sender](att_name), [timestamp](att_name) and [receiver](att_name) [Then](then) should be [valid](method_name)

## synonym: bank-account
- bank account
- bank_account
- bankaccount

## intent:SERVICE_TEST
- describe a new functionality
- add service method
- add application functionality
- I want to describe a service method
- Given an [user](model_name) [u1](instance_name) [And](and) an [user](model_name) [u2](instance_name) [When](when) [u1](instance_name) is [linked](method) to [u2](par_value) [And](and) I call [get-users](method_name) with parameter [u1](par_value) [Then](then) I expect [u2](expected_value) to be [included](op)
- Given an [user](model_name) [u1](instance_name) [And](and) an [user](model_name) [u2](instance_name) [When](when) I [link](method) [u1](instance_name) to [u2](par_value) [And](and) I call [get-users](method_name) with [u1](par_value) [Then](then) [u2](expected_value) should be [included](op)
- Given an [user](model_name) [u1](instance_name) [And](and) an [user](model_name) [u2](instance_name) [When](when) I [unlink](method) [u1](instance_name) to [u2](par_value) [And](and) I call [get-users](method_name) with [u1](par_value) [Then](then) [u2](expected_value) should [not](neg) be [included](op)
- Given an [user](model_name) [u1](instance_name) [And](and) an [user](model_name) [u2](instance_name) [When](when) I [unlink](method) [u1](instance_name) to [u2](par_value) [And](and) I call [get-users](method_name) with [u1](par_value) [Then](then) I [not](neg) expect [u2](expected_value) be [included](op)

- Given a [person](model_name) [p1](instance_name) [And](and) a [car](model_name) [c1](instance_name) [When](when) [p1](instance_name) [buy](method) [c1](instance_name) [And](and) I call [get-cars](method_name) with [p1](par_value) [Then](then) [c1](expected_value) should be [included](op)
- Given a [person](model_name) [p1](instance_name) [And](and) a [car](model_name) [c1](instance_name) [When](when) I [assign](method) [c1](par_value) to [i1](instance_name) [And](and) I call [get-cars](method_name) with [p1](par_value) [Then](then) [c1](expected_value) should be [included](op)

- Given a [company](model_name) [c1](instance_name) [And](and) a [person](model_name) [p1](instance_name) [When](when) [p1](instance_name) [buys](method) [c1](par_value)  [And](and) service [my-companies](method_name) with [p1](par_value) [Then](then) [c1](expected_value) should be [included](op)
- Given a [company](model_name) [c1](instance_name) [And](and) a [person](model_name) [p1](instance_name) [When](when) [p1](instance_name) [works](method) for [c1](par_value)  [Then](then) [c1](expected_value) should be [included](op)
- Given a [company](model_name) [c1](instance_name) [And](and) a [person](model_name) [p1](instance_name) [When](when) I [add](method_name) [p1](par_value) to [c1](instance_name)  [Then](then) [c1](expected_value) should be [included](op)
- Given a [company](model_name) [c1](instance_name) [And](and) a [person](model_name) [p1](instance_name) [When](when) I [remove](method_name) [p1](par_value) to [c1](instance_name)  [Then](then) [c1](expected_value) should [not](neg) be [included](op)
- Given a [invoice](model_name) [i1](instance_name) [And](and) a [provider](model_name) [p1](instance_name) [When](when) [i1](instance_name) [has](method) [p1](par_value) [And](and) I call method [invoices](method_name) with [p1](par_value) [Then](then) [i1](expected_value) should be [included](op)
- Given a [invoice](model_name) [i1](instance_name) [And](and) a [provider](model_name) [p1](instance_name) [When](when) I [add](method_name) [i1](par_value) to [p1](instance_name) [And](and) I call method [invoices](method_name) with [p1](par_value) [Then](then) should [include](op) [i1](expected_value)
