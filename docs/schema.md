---
description: Description of exam schema.
---

# Schema

Exam files use the `.json` extension. _JSON_, or _JavaScript Object Notation_ is a data format that is supported by many programming languages. Files must use this extension and adhere to the schema defined below.

[Exam Maker](https://exam-maker.herokuapp.com/) allows users to create and share exams without knowing this schema. However, exams can be created in any text editor.

### Example Exam File

{% code-tabs %}
{% code-tabs-item title="exam.json" %}
```javascript
{
    "id": "12345",
    "title":"Example Exam",
    "description": "An example exam",
    "author": {
        "id": "67890",
        "name": "Benjaminadk",
        "image": "http://www.example.com/image.png"
    },
    "code": "123-abc",
    "time": 60,
    "pass": 75,
    "image": "http://www.example.com/image.png",
    "cover": [
        {"variant": 2, "text": "Large Text"},
        {"variant": 1, "text": "Normal Text"}
    ],
    "test": [
        "variant": 0,
        "question": [
            {"variant": 1, "text": "Normal text"},
            {"variant": 0, "text": "Image URL"}
        ],
        "choices": [
            {"label": "A", "text": "Option A"},
            {"label": "B", "text": "Option B"},
            {"label": "C", "text": "Option C"},
            {"label": "D", "text": "Option D"},
        ],
        "answer": [true, false, false, false],
        "explanation": [
            {"variant": 1, "text": "Normal text"},
            {"variant": 0, "text": "Image URL"}
        ]
    ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}



### Exam

| Property | Description | Type |
| :--- | :--- | :---: |
| **id** | unique identifier | `string` |
| **title** | exam title | `string` |
| **description** | exam description | `string` |
| **author** | exam author | `Author` |
| **code** | certification/exam code | `string` |
| **pass** | minimum passing score percentage | `number`  |
| **time** | time limit in minutes | `number` |
| **image** | URL of exam logo 1:1 size is best | `string` |
| **cover** | first screen of exam | `Node[]` |
| **test** | exam content | `Question[]` |

#### 

### Author

| Property | Description | Type |
| :--- | :--- | :--- |
| **id** | unique identifier | `string` |
| **name** | author name | `string` |
| **image** | author image URL | `string` |

#### 

### Question

| Property | Description | Type |
| :--- | :--- | :--- |
| **variant** | type of question  | `number` |
| **question** | question content | `Node[]` |
| **choices** | answer content | `Choice[]` |
| **answer** | answer key | `boolean/string[]` |
| **explanation** | explanation content | `Node[]` |



### Question Variants

| Variant | Question Type | Answer Example |
| :--- | :--- | :--- |
| **0** | multiple choice | `[true,false,false,false]` |
| **1** | multiple answer | `[true,true,false,false]` |
| **2** | fill in the blank | `[answer,variation,another]` |
| **3** | list order | `[]` |



### Node

| Property | Description | Type |
| :--- | :--- | :--- |
| **variant** | type of node | `number` |
| **text** | content of node | `string` |



### Node Variants

| Variant | Node Type | Text  |
| :--- | :--- | :--- |
| **0** | image | URL of an image |
| **1** | normal text | Normal sized text, most commonly used variant |
| **2** | large text | Large header text |



### Choice

| Property | Description | Type |
| :--- | :--- | :--- |
| **label** | choice label text | `string` |
| **text** | content of choice | `string` |

